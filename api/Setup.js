import { firebaseHelper } from '../api/firebaseHelper';
import { unfinishedTasksChannel } from '../constants/Channels';


class Setup {

  setupApp() {
    this.setupNotifications();
  }

  setupNotifications() {
    firebaseHelper.initializeNotificationChannel(unfinishedTasksChannel.id, unfinishedTasksChannel.name, unfinishedTasksChannel.description);
    firebaseHelper.setupNotificationListeners();
  }

};

export default new Setup();
