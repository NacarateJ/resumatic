// Define a React component for the "default" elements:
const DefaultElement = (props) => {
  return <p {...props.attributes}>{props.children}</p>;
};


export default DefaultElement;