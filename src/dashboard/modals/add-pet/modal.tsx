import React, { useState, type FC } from 'react';
import { dashboard } from '@wix/dashboard';
import {
  WixDesignSystemProvider,
  Box,
  CustomModalLayout,
  Layout,
  Cell,
  FormField,
  Input,
  InputArea,
  NumberInput,
  ToggleSwitch
} from '@wix/design-system';
import '@wix/design-system/styles.global.css';
import { width, height, title } from './modal.json';
import type { Pet } from '../../../types';

type Props = {
  savePet: (pet: Pet) => void;
};

const Modal: FC<Props> = ({ savePet }) => {
  const [newPet, setNewPet] = useState<Partial<Pet>>();

  return (
    <WixDesignSystemProvider features={{ newColorsBranding: true }}>
      <CustomModalLayout
        width={width}
        maxHeight={height}
        primaryButtonText="Save"
        secondaryButtonText="Cancel"
        primaryButtonOnClick={() => {
          dashboard.closeModal();
          savePet(newPet);
        }}
        secondaryButtonOnClick={() => dashboard.closeModal()}
        onCloseButtonClick={() => dashboard.closeModal()}
        title="Add a Pet"
        subtitle="Fill the form below to add a pet to your site"
        content={
          <Layout>
            <Cell>
              <Layout gap="24px">
                <Cell span={6}>
                  <FormField label="Name">
                    <Input
                      value={newPet.name}
                      onChange={(val) => setNewPet({ ...newPet, name: val.target.value })}
                    />
                  </FormField>
                </Cell>
                <Cell span={4}>
                  <FormField label="Age">
                    <NumberInput
                      hideStepper
                      value={newPet?.age}
                      min={0}
                      onChange={(val) => setNewPet({ ...newPet, age: val! })}
                    />
                  </FormField>
                </Cell>
                <Cell span={2}>
                  <Box height={'100%'}>
                    <FormField label="Featured">
                      <ToggleSwitch
                        checked={newPet.featured}
                        onChange={(val) => setNewPet({ ...newPet, featured: val.target.checked })}
                      />
                    </FormField>
                  </Box>
                </Cell>
                <Cell>
                  <FormField label="Description">
                    <InputArea
                      value={newPet.description}
                      onChange={(val) => setNewPet({ ...newPet, description: val.target.value })}
                      placeholder="Describe your pet in a few sentences."
                      rows={2}
                    />
                  </FormField>
                </Cell>
              </Layout>
            </Cell>
          </Layout>
        }
      />
    </WixDesignSystemProvider>
  );
};

export default Modal;
