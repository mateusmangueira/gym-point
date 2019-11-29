import { createAppContainer, createSwitchNavigator } from 'react-navigation';

import SignIn from '~/pages/SignIn';
import HelpOrder from '~/pages/HelpOrder';

export default createAppContainer(
  createSwitchNavigator({
    SignIn,
    HelpOrder,
  }),
);
