import React, { type FC } from 'react';
import { httpClient } from '@wix/essentials';
import { dashboard } from '@wix/dashboard';
import { Premium } from '@wix/wix-ui-icons-common'
import { WixDesignSystemProvider, Image } from '@wix/design-system';
import '@wix/design-system/styles.global.css';
import type { Pet } from '../../types';
import { CollectionPage } from "@wix/patterns/page";
import {
  CollectionToolbarFilters,
  CustomColumns, deleteSecondaryAction,
  Filter,
  PrimaryActions, SingleSelectFilter,
  stringFilter, stringsArrayFilter,
  Table,
  useOptimisticActions, useStaticListFilterCollection,
  useTableCollection
} from "@wix/patterns";
import { WixPatternsProvider } from "@wix/patterns/provider";

const CollectionTable: FC = () => {
  type PetsFilters = {
    featured: Filter<string[]>;

  };
  const tableState = useTableCollection<Pet, PetsFilters>({
    queryName: 'pets-table',
    itemKey: (item) => item.name,
    limit:5,
    fetchData: async ({ filters , search,limit}) => {
      const petsCollection = await httpClient.fetchWithAuth(`${import.meta.env.BASE_API_URL}/pets`);
      const petsData = await petsCollection.json() as Array<Pet>;

      return {
        items: petsData.slice(0, 5),
        total: petsData.length,
        limit: 5
      }
    },
    filters: {
      featured: stringsArrayFilter()
    }
  });

  const featuredFilter = useStaticListFilterCollection(
    tableState.collection.filters.featured,
    [
      'yes',
      'no'
    ],

  );

  const optimisticActions = useOptimisticActions(tableState.collection)
  const savePet = async (pet: Pet) => {
    optimisticActions.createOne(pet, {
      submit: async () => {
        await httpClient.fetchWithAuth(`${import.meta.env.BASE_API_URL}/pets`, {
          method: 'POST',
          body: JSON.stringify(pet)
        });

        return [pet]
      },
      successToast: 'New pet was added'
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
        }/>
      <CollectionPage.Content>
        <Table
          customColumns={<CustomColumns/>}
          state={tableState}
          filters={
            <CollectionToolbarFilters
              panelTitle="Filter your contacts"
              inline={0}
            >
              <SingleSelectFilter
                popoverProps={{ appendTo: 'window' }}
                filter={tableState.collection.filters.featured}
                collection={featuredFilter}
                accordionItemProps={{ label: 'Featured' }}
                placeholder="Featured"
                renderItem={(featured) => ({ title: featured })}
                renderToolbarTag={(item) => ({
                  children: `Featured: ${item}`,
                })}
              />
            </CollectionToolbarFilters>
          }
          actionCell={(_pet, _index, actionCellAPI) => ({
            secondaryActions: [
              deleteSecondaryAction({
                optimisticActions,
                actionCellAPI,
                submit: (pets) =>( Promise.resolve()),
              }),
            ],
          })}
          columns={[
            {
              title: 'Name',
              id: 'name',
              render: (pet) => pet.name,
            },
            {
              title: 'Type',
              id: 'type',
              render: (pet) => pet.type,
            },
            {
              title: 'Age',
              id: 'age',
              render: (pet) => pet.age,
            },
            {
              title: 'Owner',
              id: 'owner',
              render: (pet) => pet.owner,
            },
            {
              title: 'Featured',
              id: 'featured',
              render: (pet) => pet.featured ? <Premium/> : null,
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
        <CollectionTable/>
      </WixPatternsProvider>
    </WixDesignSystemProvider>
  )

}

export default Index;
