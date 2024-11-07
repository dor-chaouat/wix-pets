import { items } from '@wix/data';
//
// export async function GET() {
//   const petsCollection = await items.queryDataItems({
//     dataCollectionId: 'wix-pets',
//   }).find();;
//
//   const pets = petsCollection.items;
//   return new Response(JSON.stringify(pets));
// };

export async function GET() {
  const pets = [
    {
      name: "Bella",
      age: 3,
      owner: "Alice Johnson",
      gender: "Female",
      type: "Dog",
      activity: "Fetching balls in the park",
      description: "A playful Labrador who loves to be around people.",
      image: "https://example.com/images/bella.jpg",
      featured: true,
    },
    {
      name: "Milo",
      age: 2,
      owner: "John Smith",
      gender: "Male",
      type: "Cat",
      activity: "Chasing laser pointers",
      description: "Curious and mischievous tabby cat with a lot of energy.",
      image: "https://example.com/images/milo.jpg",
      featured: false,
    },
    {
      name: "Luna",
      age: 4,
      owner: "Sarah Brown",
      gender: "Female",
      type: "Rabbit",
      activity: "Exploring the backyard",
      description: "A fluffy rabbit with a gentle nature.",
      image: "https://example.com/images/luna.jpg",
      featured: true,
    },
    {
      name: "Max",
      age: 1,
      owner: "Michael Green",
      gender: "Male",
      type: "Parrot",
      activity: "Imitating sounds",
      description: "A colorful parrot who loves to mimic voices.",
      image: "https://example.com/images/max.jpg",
      featured: false,
    },
    {
      name: "Chloe",
      age: 5,
      owner: "Emma Wilson",
      gender: "Female",
      type: "Dog",
      activity: "Running on the beach",
      description: "A loyal German Shepherd who enjoys outdoor activities.",
      image: "https://example.com/images/chloe.jpg",
      featured: true,
    },
    {
      name: "Oliver",
      age: 6,
      owner: "Lucas Martinez",
      gender: "Male",
      type: "Cat",
      activity: "Sunbathing",
      description: "A relaxed Siamese cat who loves warm places.",
      image: "https://example.com/images/oliver.jpg",
      featured: false,
    },
    {
      name: "Charlie",
      age: 2,
      owner: "Sophia Lee",
      gender: "Male",
      type: "Hamster",
      activity: "Running in the wheel",
      description: "A small, energetic hamster who loves to explore.",
      image: "https://example.com/images/charlie.jpg",
      featured: true,
    },
    {
      name: "Lucy",
      age: 7,
      owner: "Olivia Taylor",
      gender: "Female",
      type: "Dog",
      activity: "Playing with children",
      description: "A gentle Golden Retriever, great with kids.",
      image: "https://example.com/images/lucy.jpg",
      featured: false,
    },
    {
      name: "Buddy",
      age: 3,
      owner: "Daniel Harris",
      gender: "Male",
      type: "Dog",
      activity: "Chasing squirrels",
      description: "An active Beagle who loves outdoor adventures.",
      image: "https://example.com/images/buddy.jpg",
      featured: true,
    },
    {
      name: "Daisy",
      age: 4,
      owner: "Mia Moore",
      gender: "Female",
      type: "Bird",
      activity: "Singing in the morning",
      description: "A small canary known for her beautiful songs.",
      image: "https://example.com/images/daisy.jpg",
      featured: false,
    },
    {
      name: "Oscar",
      age: 1,
      owner: "Henry White",
      gender: "Male",
      type: "Fish",
      activity: "Swimming around the tank",
      description: "A colorful betta fish with a calm personality.",
      image: "https://example.com/images/oscar.jpg",
      featured: true,
    },
    {
      name: "Molly",
      age: 5,
      owner: "Isabella Young",
      gender: "Female",
      type: "Cat",
      activity: "Bird watching",
      description: "A quiet and observant Persian cat.",
      image: "https://example.com/images/molly.jpg",
      featured: false,
    }
  ];
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
