import React, { type FC, useState, useEffect } from 'react';
import { widget } from '@wix/editor';
import {
  SidePanel,
  WixDesignSystemProvider,
  Input,
  FormField,
  ColorInput,
  Box,
} from '@wix/design-system';
import '@wix/design-system/styles.global.css';

const Panel: FC = () => {
  const [title, setTitle] = useState<string>('');
  const [subtitle, setSubtitle] = useState<string>('');
  const [mainColor, setMainColor] = useState<string>('');

  useEffect(() => {
    widget.getProp('title').then(title => setTitle(title || 'Pet of the Week'));
    widget.getProp('subtitle').then(subtitle => setSubtitle(subtitle || 'About me'));
    widget.getProp('maincolor').then(mainColor => setMainColor(mainColor || '#c8dee6'));
  }, []);

  return (
    <WixDesignSystemProvider>
      <SidePanel width="300">
        <SidePanel.Content>
            <Box
              direction='vertical'
              gap={4}
            >
              <FormField label="Title">
                <Input
                  value={title}
                  onChange={(event) => {
                    const newTitle = event.target.value;
                    console.log(newTitle)
                    setTitle(newTitle);
                    widget.setProp('title', newTitle);
                  }}
                />
              </FormField>
              <FormField label="Subtitle">
                <Input
                  value={subtitle}
                  onChange={(event) => {
                    const newSubtitle = event.target.value;
                    setSubtitle(newSubtitle);
                    widget.setProp('subtitle', newSubtitle);
                  }}
                />
              </FormField>
              <FormField label="Main Color">
                <ColorInput
                  value={mainColor}
                  onConfirm={(val) => {
                    const newColor = val.toString();
                    setMainColor(newColor);
                    widget.setProp('maincolor', newColor);
                  }}
                />
              </FormField>
            </Box>
        </SidePanel.Content>
      </SidePanel>
    </WixDesignSystemProvider>
  );
};

export default Panel;
