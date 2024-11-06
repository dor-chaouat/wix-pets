import { items } from '@wix/data';

export async function GET() {
  const petsCollection = await items.queryDataItems({
    dataCollectionId: 'wix-pets',
  }).find();;

  const pets = petsCollection.items;
  return new Response(JSON.stringify(pets));
};

export async function POST(req: Request) {
  const pet = await req.json();

  await items.insertDataItem({
    dataCollectionId: 'wix-pets',
    dataItem: {
      data: {
        ...pet
      },
    },
  });

  return new Response('Success');
};
