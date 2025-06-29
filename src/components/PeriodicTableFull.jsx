import React, { useEffect, useState } from 'react';
import { data } from '../utils/data.full';
import CardScene from './CardScene';
import OrbitScene from './OrbitScene';
import { useTheme } from '../theme/ThemeContext';

const PeriodicTableFull = ({ setElementState }) => {
  const [selectedElement, setSelectedElement] = useState(data[0]);
  const { theme, setTheme } = useTheme();
  const [marker, setMarker] = useState(0.2);

  const cellTextTop = theme.text_3;
  const cellTextBottom = theme.text_2;

  function getElementClassification(classification) {
    switch (classification) {
      case 'alkali metal':
        return theme.cellBG_1;
      case 'alkaline earth metal':
        return theme.cellBG_2;
      case 'transition metal':
        return theme.cellBG_3;
      case 'post-transition metal':
        return theme.cellBG_4;
      case 'metalloid':
        return theme.cellBG_5;
      case 'nonmetal':
        return theme.cellBG_6;
      case 'noble gas':
        return theme.cellBG_7;
      case 'actinide':
        return theme.cellBG_9;
      default:
        return theme.cellBG_8;
    }
  }

  const renderCell = (element, name, classification, className = '') => (
    <div
      key={element}
      style={{
        backgroundColor: getElementClassification(classification),
      }}
      className={`p-1 w-full my-1 hover:scale-150  truncate text-center rounded-lg shadow-md  text-black font-medium hover:bg-orange-300 transition-colors cursor-pointer ${className}`}
    >
      <div style={{ color: cellTextTop }} className="text-2xl">
        {element}
      </div>
      <div style={{ color: cellTextTop }} className="text-[0.6rem]">
        {name}
      </div>
    </div>
  );

  useEffect(() => {
    setElementState(selectedElement.state);

    return () => {
      setElementState('gas');
    };
  }, [selectedElement]);

  return (
    <div className="min-h-screen  p-4 overflow-auto  flex flex-col gap-4 items-center justify-center  min-w-[100vw] ">
      <div className="absolute  top-2   justify-start w-full">
        <div>
          <button
            onClick={() => {
              setTheme('blue');
              setMarker(0.2);
            }}
            className="mx-2 px-2 h-5 w-5 py-1 rounded-full bg-blue-200"
          ></button>
          <button
            onClick={() => {
              setTheme('green');
              setMarker(2.5);
            }}
            className="mx-2 px-2 h-5 w-5 py-1 rounded-full bg-green-200"
          ></button>
          <button
            onClick={() => {
              setTheme('gold');
              setMarker(4.5);
            }}
            className="mx-2 px-2 h-5 w-5 py-1 rounded-full bg-yellow-200"
          ></button>
        </div>
        <div>
          <div className=" text-white text-2xl w-28 border-gray-300 my-2">
            <div
              style={{
                transform: `translateX(${marker}rem)`,
                transition: 'all 0.5s ease-in-out',
              }}
            >
              👆
            </div>
            <hr />
          </div>
        </div>

        <div>
          <h1 className="text-lg h-72 w-1/2   font-bold text-center absolute left-52 top-0 ">
            <CardScene selectedElement={selectedElement} theme={theme} />
          </h1>
        </div>
      </div>
      <div className="mt-16  p-4 gap-5  overflow-hidden   ">
        <div id="row-1" className={` flex w-full justify-between gap-2 `}>
          {Array.from({ length: 2 }, (_, rowIndex) => (
            <div
              className="min-w-[4.5rem] max-w-[4.5rem] "
              key={rowIndex}
              onClick={() => setSelectedElement(data[rowIndex])}
            >
              {renderCell(
                data[rowIndex].element,
                data[rowIndex].name,
                data[rowIndex].classification,
              )}
            </div>
          ))}
        </div>

        <div id="row-2" className={` flex w-full justify-between  gap-2 `}>
          <div className="flex gap-2">
            {Array.from({ length: 2 }, (_, rowIndex) => (
              <div
                className="min-w-[4.5rem] max-w-[4.5rem] "
                onClick={() => setSelectedElement(data[rowIndex + 2])}
                key={rowIndex}
              >
                {renderCell(
                  data[rowIndex + 2].element,
                  data[rowIndex + 2].name,
                  data[rowIndex + 2].classification,
                )}
              </div>
            ))}
          </div>
          <div className="flex gap-2">
            {Array.from({ length: 6 }, (_, rowIndex) => (
              <div
                className="min-w-[4.5rem] max-w-[4.5rem] "
                onClick={() => setSelectedElement(data[rowIndex + 4])}
                key={rowIndex}
              >
                {renderCell(
                  data[rowIndex + 4].element,
                  data[rowIndex + 4].name,
                  data[rowIndex + 4].classification,
                )}
              </div>
            ))}
          </div>
        </div>

        <div id="row-3" className={` flex w-full justify-between  gap-2 `}>
          <div className="flex gap-2">
            {Array.from({ length: 2 }, (_, rowIndex) => (
              <div
                onClick={() => setSelectedElement(data[rowIndex + 10])}
                className="min-w-[4.5rem] max-w-[4.5rem] "
                key={rowIndex}
              >
                {renderCell(
                  data[rowIndex + 10].element,
                  data[rowIndex + 10].name,
                  data[rowIndex + 10].classification,
                )}
              </div>
            ))}
          </div>
          <div className="flex gap-2">
            {Array.from({ length: 6 }, (_, rowIndex) => (
              <div
                className="min-w-[4.5rem] max-w-[4.5rem] "
                onClick={() => setSelectedElement(data[rowIndex + 12])}
                key={rowIndex}
              >
                {renderCell(
                  data[rowIndex + 12].element,
                  data[rowIndex + 12].name,
                  data[rowIndex + 12].classification,
                )}
              </div>
            ))}
          </div>
        </div>

        <div id="row-4" className={` flex w-full justify-between  gap-2 `}>
          <div className="flex gap-2">
            {Array.from({ length: 18 }, (_, rowIndex) => (
              <div
                className="min-w-[4.5rem] max-w-[4.5rem] "
                onClick={() => setSelectedElement(data[rowIndex + 18])}
                key={rowIndex}
              >
                {renderCell(
                  data[rowIndex + 18].element,
                  data[rowIndex + 18].name,
                  data[rowIndex + 18].classification,
                )}
              </div>
            ))}
          </div>
        </div>
        <div id="row-5" className={` flex w-full justify-between  gap-2 `}>
          <div className="flex gap-2">
            {Array.from({ length: 18 }, (_, rowIndex) => (
              <div
                className="min-w-[4.5rem] max-w-[4.5rem] "
                onClick={() => setSelectedElement(data[rowIndex + 36])}
                key={rowIndex}
              >
                {renderCell(
                  data[rowIndex + 36].element,
                  data[rowIndex + 36].name,
                  data[rowIndex + 36].classification,
                )}
              </div>
            ))}
          </div>
        </div>

        <div id="row-6" className={` flex w-full justify-between  gap-2 `}>
          <div className="flex gap-2">
            {Array.from({ length: 3 }, (_, rowIndex) => (
              <div
                onClick={() => setSelectedElement(data[rowIndex + 54])}
                className="min-w-[4.5rem] max-w-[4.5rem] "
                key={rowIndex}
              >
                {renderCell(
                  data[rowIndex + 54].element,
                  data[rowIndex + 54].name,
                  data[rowIndex + 54].classification,
                )}
              </div>
            ))}
          </div>
          <div className="flex gap-2">
            {Array.from({ length: 15 }, (_, rowIndex) => (
              <div
                className="min-w-[4.5rem] max-w-[4.5rem] "
                onClick={() => setSelectedElement(data[rowIndex + 71])}
                key={rowIndex}
              >
                {renderCell(
                  data[rowIndex + 71].element,
                  data[rowIndex + 71].name,
                  data[rowIndex + 71].classification,
                )}
              </div>
            ))}
          </div>
        </div>

        <div id="row-6" className={` flex w-full justify-between  gap-2 `}>
          <div className="flex gap-2">
            {Array.from({ length: 3 }, (_, rowIndex) => (
              <div
                onClick={() => setSelectedElement(data[rowIndex + 86])}
                className="min-w-[4.5rem] max-w-[4.5rem] "
                key={rowIndex}
              >
                {renderCell(
                  data[rowIndex + 86].element,
                  data[rowIndex + 86].name,
                  data[rowIndex + 86].classification,
                )}
              </div>
            ))}
          </div>
          <div className="flex gap-2">
            {Array.from({ length: 15 }, (_, rowIndex) => (
              <div
                className="min-w-[4.5rem] max-w-[4.5rem] "
                onClick={() => setSelectedElement(data[rowIndex + 103])}
                key={rowIndex}
              >
                {renderCell(
                  data[rowIndex + 103].element,
                  data[rowIndex + 103].name,
                  data[rowIndex + 103].classification,
                )}
              </div>
            ))}
          </div>
        </div>

        {/*  */}

        <div id="row-down-1" className={` flex w-full justify-center `}>
          <div className="flex gap-2">
            {Array.from({ length: 14 }, (_, rowIndex) => (
              <div
                className="min-w-[4.5rem] max-w-[4.5rem] "
                onClick={() => setSelectedElement(data[rowIndex + 57])}
                key={rowIndex}
              >
                {renderCell(
                  data[rowIndex + 57].element,
                  data[rowIndex + 57].name,
                  data[rowIndex + 57].classification,
                )}
              </div>
            ))}
          </div>
        </div>
        <div id="row-down-2" className={` flex w-full justify-center `}>
          <div className="flex gap-2">
            {Array.from({ length: 14 }, (_, rowIndex) => (
              <div
                className="min-w-[4.5rem] max-w-[4.5rem] "
                onClick={() => setSelectedElement(data[rowIndex + 89])}
                key={rowIndex}
              >
                {renderCell(
                  data[rowIndex + 89].element,
                  data[rowIndex + 89].name,
                  data[rowIndex + 89].classification,
                )}
              </div>
            ))}
          </div>
        </div>

        {/*  */}
      </div>
    </div>
  );
};

export default PeriodicTableFull;
