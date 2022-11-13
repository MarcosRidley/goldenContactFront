import WhatsAppIcon from '@mui/icons-material/WhatsApp';
import getWhatsappLink from "../../../helper/getWhatsappLink";

interface WhatsappBtnProps {
  areaCode: string;
  number: string;
}

const whatsappBtn = (props:WhatsappBtnProps) => {
  const { areaCode, number } = props;
  const url = getWhatsappLink(areaCode, number);

  return (
    <a
      href = {url}
      target="_blank"
      rel="noopener noreferrer"
      style={{ textDecoration: "none" }}
    >
      <WhatsAppIcon fontSize='large' color='primary' />
    </a>
  )
}


export default whatsappBtn;