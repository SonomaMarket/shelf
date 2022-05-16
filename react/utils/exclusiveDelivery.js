export default function isExlusiveDelivery(city, categoryId) {
    const deliveryList = {
        "7/1424079932": "São Paulo",
        "7/894373516": "São Paulo"
    }

    if(deliveryList[categoryId])
        return deliveryList[categoryId] !== city

    return false
}

