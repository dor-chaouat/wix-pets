import React, { type FC } from 'react';
import { httpClient } from '@wix/essentials';
import { dashboard } from '@wix/dashboard';
import { Premium } from '@wix/wix-ui-icons-common'
import {
  CustomColumns,
  PrimaryActions,
  Table,
  useOptimisticActions,
  useTableCollection,
} from "@wix/patterns";
import { CollectionPage } from "@wix/patterns/page";
import { WixPatternsProvider } from "@wix/patterns/provider";
import { WixDesignSystemProvider } from '@wix/design-system';
import '@wix/design-system/styles.global.css';
import type { Pet } from '../../types';

const PetsTable: FC = () => {
  const tableState = useTableCollection<Pet>({
    queryName: 'pets-table',
    itemKey: (item) => item.name,
    fetchData: async ({ search }) => {
      const requestUrl = new URL(`${import.meta.env.BASE_API_URL}/pets`);
      search && requestUrl.searchParams.append('search', search);

      const petsCollection = await httpClient.fetchWithAuth(requestUrl);
      const petsData = await petsCollection.json() as Array<Pet>;

      return {
        items: petsData,
      }
    },
  });

  const optimisticActions = useOptimisticActions(tableState.collection)
  const savePet = async (pet: Pet) => {
    optimisticActions.createOne(pet, {
      successToast: `${pet.name} was added`,
      submit: async () => {
        await httpClient.fetchWithAuth(`${import.meta.env.BASE_API_URL}/pets`, {
          method: 'POST',
          body: JSON.stringify(pet)
        });

        return [pet];
      },
    })
  };

  return (
    <CollectionPage>
      <CollectionPage.Header
        title={{ text: 'Pets Manager' }}
        subtitle={{
          text: 'Add pets to your site.'
        }}
        primaryAction={
          <PrimaryActions
            label="Add a Pet"
            onClick={() => dashboard.openModal('44ac8a13-0bf7-4877-8d83-ef182188913f', { savePet })}
          />
        } />
      <CollectionPage.Content>
        <Table
          customColumns={<CustomColumns />}
          state={tableState}
          columns={[
            {
              title: 'Name',
              id: 'name',
              render: (pet) => pet.name,
            },
            {
              title: 'Age',
              id: 'age',
              render: (pet) => pet.age,
            },
            {
              title: 'Featured',
              id: 'featured',
              render: (pet) => pet.featured ? <Premium /> : null,
            }
          ]}
        />
      </CollectionPage.Content>
    </CollectionPage>
  );
};

const Index: FC = () => {
  return (
    <WixDesignSystemProvider features={{ newColorsBranding: true }}>
      <WixPatternsProvider>
        <PetsTable />
      </WixPatternsProvider>
    </WixDesignSystemProvider>
  )
}

export default Index;
