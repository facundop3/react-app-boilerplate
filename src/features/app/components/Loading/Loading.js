import PropTypes from 'prop-types';

import {
  Wrapper,
  Spinner,
  DoubleBounce,
  DoubleBounceWithDelay,
} from './Loading.styles';

const Loading = ({ styles }) => (
  <Wrapper styles={styles}>
    <Spinner>
      <DoubleBounce />
      <DoubleBounceWithDelay />
    </Spinner>
  </Wrapper>
);

Loading.defaultProps = {
  styles: {},
};

Loading.propTypes = {
  styles: PropTypes.object,
};

export default Loading;
