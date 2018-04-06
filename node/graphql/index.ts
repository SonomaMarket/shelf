import axios from 'axios'

export const resolvers = {
  Query: {
    getRecomendations: async (root, args, ctx) => {

      let account = ctx.request.header['x-vtex-account']
      let environment = 'vtexcommercestable'
      let VTEX_API_KEY  = ctx.request.header['x-vtex-account-id']
      let VTEX_API_TOKEN = ctx.request.header['x-vtex-credential']
      let productId = 2
      let url = `http://${account}.${environment}.com.br/api/catalog_system/pub/products/crossselling/whoboughtalsobought/${productId}`
      
      // let whoboughtalsobought= await axios.get(url, {
      //   headers: {
      //         'X-VTEX-API-AppKey': VTEX_API_KEY,
      //         'X-VTEX-API-AppToken': VTEX_API_TOKEN,
      //         'Proxy-Authorization': VTEX_API_TOKEN
      //       }
      // });

      return [
        {
          id: 1,
          name: 'Batom Cod. 3456',
          imagePath: '//boticario.vteximg.com.br/arquivos/ids/188719-1000-1000/batom-mate-vermelho-capricho-72030.jpg?v=636313086762900000',
          price: 180.80
        },
        {
          id: 2,
          name: 'Condicionador Respeito aos Cachos',
          imagePath: '//boticario.vteximg.com.br/arquivos/ids/192275-500-500/Match_Condicionador_Respeito_aos_Cachos_Co-Wash_300ml_71677_frontal.jpg?v=636571402747030000',
          price: 25.80
        },
        {
          id: 3,
          name: 'Batom Intense Cod. 9056',
          imagePath: '//boticario.vteximg.com.br/arquivos/ids/186119-500-500/intense-batom-mate-vermelho-chic-27398.jpg?v=636120756856200000',
          price: 25.80
        },
        {
          id: 4,
          name: 'Brilho Labial Cod. 19056',
          imagePath: '//boticario.vteximg.com.br/arquivos/ids/187104-500-500/brilho-labial-intense-divando-aberto-27160.jpg?v=636171624876370000',
          price: 25.80
        },
        {
          id: 5,
          name: 'Escova de Cabelo',
          imagePath: '//boticario.vteximg.com.br/arquivos/ids/192255-500-500/Match_Escova_de_Cabelo_Acrilonitrila_Butadieno_Estireno_42503_frontal.jpg?v=636571391959470000',
          price: 25.80
        },
        {
          id: 6,
          name: 'Batom Cod. 39056',
          imagePath: '//boticario.vteximg.com.br/arquivos/ids/188719-1000-1000/batom-mate-vermelho-capricho-72030.jpg?v=636313086762900000',
          price: 25.80
        },
        {
          id: 7,
          name: 'Batom Cod. 009056',
          imagePath: '//boticario.vteximg.com.br/arquivos/ids/188719-1000-1000/batom-mate-vermelho-capricho-72030.jpg?v=636313086762900000',
          price: 25.80
        }
      ]
    }
  }
}
