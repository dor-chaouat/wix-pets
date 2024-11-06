import React, { useEffect, useState, type FC } from 'react';
import ReactDOM from 'react-dom';
import reactToWebComponent from 'react-to-webcomponent';
import { httpClient } from '@wix/essentials';
import type { Pet } from '../../../../types';
import styles from './element.module.css';

type Props = {
  title: string;
  subtitle: string;
  maincolor: string;
};

const CustomElement: FC<Props> = (props) => {
  const [pet, setPet] = useState<Pet | undefined>();

  useEffect(() => {
    const fetchPetOfTheWeek = async () => {
      const petsCollection = await httpClient.fetchWithAuth(`${import.meta.env.BASE_API_URL}/pets`);
      const pets: Array<{ data: Pet }> = await petsCollection.json();
      const petOfTheWeek = pets.find(el => el.data.featured);

      setPet(petOfTheWeek?.data);
    };

    fetchPetOfTheWeek();
  }, [])

  return (
    <div className={styles.root}>
      {!pet ? (
        <div className={styles.skeleton}></div>
      ) : (
        <div
          className={styles.frame}
          style={{ backgroundColor: props.maincolor }}
        >
          <div className={styles.header}>
            <h1>{props.title}</h1>
          </div>
          <div className={styles.hero}>
            <div className={styles.list}>
              <div>
                <strong>Name</strong>
                <p>{pet.name}</p>
              </div>
              <div>
                <strong>Age</strong>
                <p>{`${pet.age} Years Old`}</p>
              </div>
              <div>
                <strong>Owner</strong>
                <p>{pet.owner}</p>
              </div>
              <div>
                <strong>Gender</strong>
                <p>{pet.gender}</p>
              </div>
              <div>
                <strong>Type</strong>
                <p>{pet.type}</p>
              </div>
              <div>
                <strong>Activity</strong>
                <p>{pet.activity}</p>
              </div>
            </div>
            <img
              src={pet.image}
              className={styles.image}
            />
          </div>
          <div style={{ padding: '24px' }}>
            <h2 className={styles.subtitle}>{props.subtitle}</h2>
            <p>{pet.description}</p>
          </div>
        </div>
      )}
    </div>
  );
};

const customElement = reactToWebComponent(
  CustomElement,
  React,
  ReactDOM as any,
  {
    props: {
      title: 'string',
      subtitle: 'string',
      maincolor: 'string',
    },
  }
);

export default customElement;
