import { green, grey, red } from '@mui/material/colors';
import React from 'react';
import ImageMapper from 'react-image-mapper';
import api from '../../constants/apiLocalBio';

export default function Mao(props) {
  const handleClickDedo = async (name) => {
    const isup = await api.get('/isup');

    if (!props.isBlocked && isup.status === 200) {
      props.setIsBlocked(true);

      if (props.setBlockUI) props.setBlockUI(true);

      props.map.areas.find((area) => area.name == name).preFillColor = grey[500];
      props.setMap({ ...props.map });

      props.count(0);

      let response;

      try {
        await api.get(`/digital/ler?dedo=${name}`);
        props.count(1);
        await api.get(`/digital/ler?dedo=${name}`);
        props.count(2);
        response = await api.get(`/digital/ler?dedo=${name}`);
        props.count(3);

        if (response?.data) {
          props.map.areas.find((area) => area.name == name).preFillColor = green.A700;

          props.hashes.find((hash) => hash.index == name).hash = response.data;
          props.setHashes([...props.hashes]);
        } else {
          props.map.areas.find((area) => area.name == name).preFillColor = red.A700;
        }
      } catch (e) {
        props.count(0);
        props.map.areas.find((area) => area.name == name).preFillColor = red.A700;
      }

      props.setMap({ ...props.map });
      props.setIsBlocked(false);
      if (props.setBlockUI) props.setBlockUI(false);
    }
  }

  return (
    <div style={{ float: 'left', margin: '2em' }}>
      <ImageMapper src={props.src} map={props.map} width={props.width} onClick={area => handleClickDedo(area.name)} />
    </div>
  )
}