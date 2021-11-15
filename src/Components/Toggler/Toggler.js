// standard package imports

import { useSelector } from 'react-redux';

// Component creation
const Toggler = ({id, children}) => {
  const isOpen = useSelector(state => state.toggler.toggles[id]);
  return isOpen ? children : null;
};

// Export component to be used elsewhere
export default Toggler;
