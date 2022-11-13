const getWhatsappLink = (areaCode:string, phone:string) => {
  return `https://api.whatsapp.com/send?phone=55${areaCode}${phone}`;
}

export default getWhatsappLink;