import React from 'react'
import PropTypes from 'prop-types'
import { Query } from 'react-apollo'
import { useDevice } from 'vtex.device-detector'
import { ProductListContext } from 'vtex.product-list-context'
import { useProduct } from 'vtex.product-context'
import { useCssHandles } from 'vtex.css-handles'
import { useTreePath } from 'vtex.render-runtime'

import OrdenationTypes from './utils/OrdenationTypes'
import { default as productsQueryCustom } from './queries/productsQuery.gql'
import ProductList from './components/ProductList'
import { productListSchemaPropTypes } from './utils/propTypes'
import { filterOutOfStock } from './utils/filterOutOfStock'
import styles from './components/shelf.css'
import harmonizationToCategory from './utils/resolveHarmonizationToCategory'

const CSS_HANDLES = ['harmonizationProducts']

const { ProductListProvider } = ProductListContext

const HarmonizationProducts = ({
  productList,
  trackingId: rawTrackingId,
  hideOutOfStockItems,
  collection
}) => {
  const handles = useCssHandles(CSS_HANDLES)
  const { isMobile } = useDevice()
  const treePath = useTreePath()
  const orderBy = OrdenationTypes.ORDER_BY_TOP_SALE_DESC.value;
  const specificationFilters = [];
  const maxItems = ProductList.defaultProps.maxItems;
  const parseFilters = ({ id, value }) => `specificationFilter_${id}:${value}`;
  const toBoolean = x => (typeof x === 'boolean' ? x : x === 'true');

  const productContext = useProduct()
  const [harmonizations] = productContext.product?.properties?.filter(property => property.name === 'Harmonização') || [];
  const categoryHarmonizations = harmonizations?.values?.map(value => harmonizationToCategory(value));
  const filteredHarmonizations = categoryHarmonizations?.filter(value => value);

  let trackingId = rawTrackingId

  if (!trackingId) {
    // Taking the block name to pass to listName if no trackingId is passed
    const treePathList =
      (typeof treePath === 'string' && treePath.split()) || []
    trackingId = treePathList[treePathList.length - 1] || 'List of products'
  }

  if(!filteredHarmonizations || !filteredHarmonizations?.[0])
    return null
  
  return (
    filteredHarmonizations.map(categoryHarmonization => {
      if (!categoryHarmonization)
        return null;

      return (
        <section className={styles.shelf__harmonization__wrapper} key={categoryHarmonization.name}>
          <h2 className={styles.product__shelf__title} id={categoryHarmonization.name}>{categoryHarmonization.name}</h2>
          <Query
            query={productsQueryCustom}
            variables={{
              ...(categoryHarmonization.id && { category: categoryHarmonization.id.toString() }),
              ...(collection && { collection: collection.toString() }),
              specificationFilters: specificationFilters.map(parseFilters),
              orderBy,
              from: 0,
              to: maxItems - 1,
              hideUnavailableItems: toBoolean(hideOutOfStockItems),
            }}
            partialRefetch
            ssr={false}
          >
            {({ data, loading }) => {
              if (!data) {
                return null
              }
              const { products = [] } = data

              const productListProps = {
                products: hideOutOfStockItems
                  ? filterOutOfStock(products)
                  : products,
                loading,
                ...productList,
                isMobile,
                trackingId,
              }
              return (
                <div className={handles.relatedProducts}>
                  <ProductListProvider listName={trackingId}>
                    <ProductList {...productListProps} />
                  </ProductListProvider>
                </div>
              )
            }}
          </Query>
        </section>
      )
    })
  )

}

HarmonizationProducts.propTypes = {
  /** Main product to have related products queried */
  slug: PropTypes.string,
  /** Graphql productQuery response. */
  /** ProductList schema configuration */
  productList: PropTypes.shape(productListSchemaPropTypes),
  trackingId: PropTypes.string,
  hideOutOfStockItems: PropTypes.bool,
}

HarmonizationProducts.defaultProps = {
  productList: {
    ...ProductList.defaultProps,
    titleText: 'Related Products',
  },
  hideOutOfStockItems: true
}

HarmonizationProducts.schema = {
  title: 'admin/editor.harmonizationProducts.title',
  description: 'admin/editor.harmonizationProducts.description',
  type: 'object',
  properties: {
    recommendation: {
      title: 'admin/editor.harmonizationProducts.recommendation',
      description: 'admin/editor.harmonizationProducts.recommendation.description',
      type: 'string',
      default: HarmonizationProducts.defaultProps.recommendation,
      enum: [
        'similars',
        'view',
        'buy',
        'accessories',
        'viewAndBought',
        'suggestions',
      ],
      enumNames: [
        'admin/editor.harmonizationProducts.similars',
        'admin/editor.harmonizationProducts.view',
        'admin/editor.harmonizationProducts.buy',
        'admin/editor.harmonizationProducts.accessories',
        'admin/editor.harmonizationProducts.viewAndBought',
        'admin/editor.harmonizationProducts.suggestions',
      ],
    },
    productList: ProductList.schema,
    hideOutOfStockItems: {
      title: 'admin/editor.shelf.hideOutOfStockItems',
      type: 'boolean',
      default: false,
    },
  },
}

export default HarmonizationProducts
