export default function harmonizationToCategory(harmonization) {
    const categoriesRelation = {
      "Comida Japonesa": null,
      "Carnes": null,
      "Massas": "7/1424079926",
      "Peixes": null,
      "Vegetarianos": null,
      "Árabe": null,
      "Comidas Asiaticas": null,
      "Hamburguer": null,
      "Pizzas": null,
      "Aves": null,
      "Frutos do mar": null,
      "Queijos": "7/894373516",
      "Vinhos de Sobremesa": "1/143",
      "Sobremesas": "7/2019503269",
      "Frutas secas": null,
      "Nuts": null,
    }
  
    if (categoriesRelation[harmonization])
      return {
        name: harmonization,
        id: categoriesRelation[harmonization]
      }
  }

export function checkValidHarmonization(properties) {
    if(!properties)
        return false

    const [harmonizations] = properties.filter(property => property.name === 'Harmonização')
    const categoryHarmonizations = harmonizations?.values?.map(value => harmonizationToCategory(value));
    const filteredHarmonization = categoryHarmonizations.filter(value => value);

    if(filteredHarmonization?.[0])
        return true

    return false
}