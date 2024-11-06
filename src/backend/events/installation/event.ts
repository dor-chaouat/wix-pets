import { auth } from '@wix/essentials';
import { collections } from '@wix/data';
import { appInstances } from '@wix/app-management';

appInstances.onAppInstanceInstalled(() => {
  auth.elevate(collections.createDataCollection)({
    _id: 'wix-pets',
    displayName: "Wix Pets",
    fields: [
      { key: 'name', type: collections.Type.TEXT },
      { key: 'age', type: collections.Type.NUMBER },
      { key: 'owner', type: collections.Type.TEXT },
      { key: 'gender', type: collections.Type.TEXT },
      { key: 'type', type: collections.Type.TEXT },
      { key: 'activity', type: collections.Type.TEXT },
      { key: 'description', type: collections.Type.TEXT },
      { key: 'image', type: collections.Type.URL },
      { key: 'featured', type: collections.Type.BOOLEAN },
    ],
  });
});
