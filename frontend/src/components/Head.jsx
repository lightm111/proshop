import { Helmet } from "react-helmet-async";

const Head = ({ title, description, keywords }) => {
  return (
    <Helmet>
      <title>{title}</title>
      <meta name="description" content={description} />
      <meta name="keywords" content={keywords} />
    </Helmet>
  );
};

Head.defaultProps = {
  title: "Proshop",
  description: "Selling Top quality products at reduced price",
  keywords: "gadget, electronic, technology",
};

export default Head;
