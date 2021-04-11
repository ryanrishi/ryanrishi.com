import PropTypes from 'prop-types';

const calloutTypeToColorName = {
  success: 'green',
  info: 'blue',
  warning: 'yellow',
  error: 'red'
};

export default function Callout({ type, children }) {
  const color = calloutTypeToColorName[type];

  return (
    <div className={`text-${color}-800 border-l-4 border-${color}-800 bg-${color}-100 pl-2 py-4 mb-4`}>{children}</div>
  );
}

Callout.propTypes = {
  type: PropTypes.oneOf(['success', 'info', 'warning', 'error']).isRequired
};
