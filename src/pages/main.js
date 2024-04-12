import React, { useState, useEffect } from 'react';
import { FullScreen, useFullScreenHandle } from 'react-full-screen';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faInstagram } from '@fortawesome/free-brands-svg-icons';

import api from '../services/api';

import LOGO_CLIENTE from '../assets/logo.png';
import LOGO_CLIENTE_145 from '../assets/145.png';

const test = [
  {
    id: 1,
    noivos: 'João e Maria',
    horacasamento: '13:00',
  },
  {
    id: 2,
    noivos: 'Pedro e Ana',
    horacasamento: '13:15',
  },
  {
    id: 3,
    noivos: 'Carlos e Laura',
    horacasamento: '13:30',
  },
];

export default function Main() {
  const [realizar, setRealizar] = useState({
    first: [],
    second: [],
  });

  const fullScreenHandle = useFullScreenHandle();

  const convertHour = (value) => {
    let _hour = value.split(':');

    var _newDate = new Date();
    return new Date(
      _newDate.getFullYear(),
      _newDate.getMonth(),
      _newDate.getDate(),
      _hour[0],
      _hour[1],
    );
  };

  const getData = async () => {
    const _intervalo = 30;

    await api
      .get('/data/tv/2')
      .then((response) => {
        var _date = new Date();
        let _realizar = [];

        response.data.map((item) => {
          let _horacasamento = convertHour(item.horacasamento);
          let _start = convertHour(
            _horacasamento.getHours() +
              ':' +
              (_horacasamento.getMinutes() - _intervalo),
          );
          let _end = convertHour(
            _horacasamento.getHours() +
              ':' +
              (_horacasamento.getMinutes() + _intervalo),
          );

          if (_start < _date && _end > _date) {
            _realizar.unshift(item);
          }
        });

        const firstSide = _realizar.slice(0, 12);
        const secondSide = _realizar.slice(12, _realizar.length);

        setRealizar({
          first: firstSide,
          second: secondSide,
        });
      })
      .catch((error) => {
        console.log(error);
      });
  };

  useEffect(() => {
    getData();

    const intervalData = setInterval(() => {
      getData();
    }, 3600000);

    return () => clearInterval(intervalData);
  }, []);

  return (
    <FullScreen handle={fullScreenHandle}>
      <div className="content">
        <div className="header">
          <img className="logo" src={LOGO_CLIENTE} alt="" />
          <span className="title">CASAMENTOS DO DIA</span>
          <div className="empty"></div>
        </div>
        <div className="main img-logo">
          <div className="box" style={{ height: 'calc(100dvh - 138px)' }}>
            <div className="grid">
              <div style={{ width: '100%' }}>
                <div className="box-grid" />
                <div className="colums" style={{ width: '100%' }}>
                  <div className="first-side">
                    {realizar.first.map((item, key) => {
                      return (
                        <div
                          key={key}
                          style={{
                            display: 'flex',
                            flexDirection: 'row',
                            justifyContent: 'space-between',
                          }}
                        >
                          <div>
                            <span className="description">
                              {item.noivos.replace(/ e /g, ' & ').toUpperCase()}
                            </span>
                          </div>
                          <div style={{ textAlign: 'right' }}>
                            <span className="description">
                              {item.horacasamento}
                            </span>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                  <hr className="divider" />
                  <div className="second-side">
                    {realizar.second.map((item, key) => {
                      return (
                        <div
                          key={key}
                          style={{
                            display: 'flex',
                            flexDirection: 'row',
                            marginTop: '2px',
                            justifyContent: 'space-between',
                          }}
                        >
                          <div>
                            <span className="description">
                              {item.noivos.replace(/ e /g, ' & ').toUpperCase()}
                            </span>
                          </div>
                          <div style={{ textAlign: 'right' }}>
                            <span className="description">
                              {item.horacasamento}
                            </span>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="footer">
          <div className="div-center">
            <div className="icon">
              <FontAwesomeIcon icon={faInstagram} color="white" size="2x" />
              <span className="footer-title">cartorioantoniodoprado</span>
            </div>
          </div>
          <div className="div-img">
            <img src={LOGO_CLIENTE_145} alt="logo" />
          </div>
        </div>
      </div>
    </FullScreen>
  );
}
