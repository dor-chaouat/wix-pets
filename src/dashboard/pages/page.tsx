import React, { useEffect, useState, type FC } from 'react';
import { httpClient } from '@wix/essentials';
import { dashboard } from '@wix/dashboard';
import { Add, Premium } from '@wix/wix-ui-icons-common'
import {
  Box,
  Button,
  Loader,
  Page,
  Table,
  WixDesignSystemProvider,
} from '@wix/design-system';
import '@wix/design-system/styles.global.css';
import type { Pet } from '../../types';

const Index: FC = () => {
  const [pets, setPets] = useState<Pet[]>();

  useEffect(() => {
    const fetchPets = async () => {
      const petsCollection = await httpClient.fetchWithAuth(`${import.meta.env.BASE_API_URL}/pets`);
      const petsData = await petsCollection.json() as Array<{ data: Pet }>;

      setPets(petsData.map(pet => pet.data));
    };

    fetchPets();
  }, []);

  const savePet = async (pet: Pet) => {
    await httpClient.fetchWithAuth(`${import.meta.env.BASE_API_URL}/pets`, {
      method: 'POST',
      body: JSON.stringify(pet)
    });

    dashboard.showToast({
      type: 'success',
      message: 'New pet was added'
    });

    setPets(pets ? [...pets, pet] : [pet])
  };

  return (
    <WixDesignSystemProvider features={{ newColorsBranding: true }}>
      {!pets ? (
        <Box
          height='100vh'
          align='center'
          verticalAlign='middle'
        >
          <Loader />
        </Box>
      ) : (
        <Page height='100vh'>
          <Page.Header
            title="Pets Manager"
            subtitle="Add pets to your site."
            actionsBar={
              <Button
                onClick={() => { dashboard.openModal('44ac8a13-0bf7-4877-8d83-ef182188913f', { savePet }) }}
                prefixIcon={<Add />}
              >
                Add Pet
              </Button>
            }
          />
          <Page.Content>
            <Table<Pet>
              columns={[
                {
                  title: 'Name',
                  render: (pet) => pet.name,
                },
                {
                  title: 'Age',
                  render: (pet) => pet.age,
                },
                {
                  title: 'Owner',
                  render: (pet) => pet.owner,
                },
                {
                  title: 'Featured',
                  render: (pet) => pet.featured ? <Premium /> : null,
                }
              ]}
              data={pets}
            >
              {pets.length ? (
                <Table.Content />
              ) : (
                <Table.EmptyState
                  title="Add your first member"
                  subtitle="Once you add members, you'll be able to see and manage them here."
                />
              )}
            </Table>
          </Page.Content>
        </Page>
      )}
    </WixDesignSystemProvider>
  );
};

export default Index;
