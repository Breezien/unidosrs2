import { defineStorage } from '@aws-amplify/backend';

export const storage = defineStorage({
  name: 'unidosrsStorage',
  access: (allow) => ({
    'placePictures/{entity_id}/*': [
      allow.guest.to(['read']),
      allow.entity('identity').to(['read', 'write']),
      allow.groups(['Admin']).to(['read', 'write', 'delete']),
    ],
  })
});