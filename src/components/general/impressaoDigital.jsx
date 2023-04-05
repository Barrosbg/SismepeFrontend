import { green, red } from '@mui/material/colors';
import { useEffect, useState } from 'react';
import maoDireita from '../../assets/mao-direita.png';
import maoEsquerda from '../../assets/mao-esquerda.png';
import Mao from '../../components/general/mao';
import ProgressoCircularComTexto from '../../components/general/progressoCircularComTexto';
import api from '../../constants/api';
import Timer from './timer';

const ImpressaoDigital = ({ cdPessoa, hashes, setHashes, setBlockUI }) => {
  const [count, setCount] = useState(0);
  const [lastCount, setLastCount] = useState(count);
  const [isBlocked, setIsBlocked] = useState(false);
  const [mapEsq, setMapEsq] = useState({
    name: 'mapEsq',
    areas: [
      { name: "1", shape: "circle", coords: [160, 25, 10], preFillColor: red.A700 },
      { name: "2", shape: "circle", coords: [240, 185, 10], preFillColor: red.A700 },
    ]
  });
  const [mapDir, setMapDir] = useState({
    name: 'mapDir',
    areas: [
      { name: "3", shape: "circle", coords: [10, 185, 10], preFillColor: red.A700 },
      { name: "4", shape: "circle", coords: [95, 30, 10], preFillColor: red.A700 },
    ]
  });

  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    async function getDigitais() {
      const res = await api.post('/biometria/digitais', { cdPessoa: cdPessoa });

      res.data?.map((digital) => {
        if (digital.dsBiometriaHash !== "") {
          hashes.find((hash) => hash.index === digital.cdIdentificadorDedo).hash = digital.dsBiometriaHash;
          setHashes([...hashes]);

          if (digital.cdIdentificadorDedo === 1 || digital.cdIdentificadorDedo === 2) {
            mapEsq.areas.find((area) => area.name == digital.cdIdentificadorDedo).preFillColor = green.A700;
            setMapEsq({ ...mapEsq });
          } else if (digital.cdIdentificadorDedo === 3 || digital.cdIdentificadorDedo === 4) {
            mapDir.areas.find((area) => area.name == digital.cdIdentificadorDedo).preFillColor = green.A700;
            setMapDir({ ...mapDir });
          }
        }
      });

      setIsLoaded(true);
    }

    getDigitais();
  }, []);

  useEffect(() => {
    if (isLoaded) {
      setLastCount(count);
    }
  }, [count]);

  return (
    <div className="maos" >
      <div style={{ height: '3rem', width: '100%', display: 'flex', justifyContent: 'center', position: 'relative' }}>
        <div style={{ position: 'absolute', left: 0, right: 0, top: -11.2, bottom: 0}}>
          {((count == lastCount) && count > 0 && count < 3) && <Timer startTime={30} showText={false} height={82} thickness={3} color="secondary" />}
        </div>
        <div>
          {count > 0 ? <ProgressoCircularComTexto height={100} thickness={4} value={Math.ceil(count * 33.33)} valueText={`${count}/3`} /> : <div></div>}
        </div>
      </div>

      {isLoaded &&
        <div style={{ justifyContent: 'center', display: 'flex' }}>
          <Mao count={setCount} src={maoEsquerda} map={mapEsq} setMap={setMapEsq} isBlocked={isBlocked} setIsBlocked={setIsBlocked} setBlockUI={setBlockUI} hashes={hashes} setHashes={setHashes} width={250} />
          <Mao count={setCount} src={maoDireita} map={mapDir} setMap={setMapDir} isBlocked={isBlocked} setIsBlocked={setIsBlocked} setBlockUI={setBlockUI} hashes={hashes} setHashes={setHashes} width={250} />
        </div>}
    </div>
  );
}

export default ImpressaoDigital;