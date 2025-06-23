import React, { useState } from 'react';
import { data } from '../utils/data.full';
import CardScene from './CardScene';
import OrbitScene from './OrbitScene';
import { useTheme } from '../theme/ThemeContext';

const PeriodicTableFull = () => {
  const [selectedElement, setSelectedElement] = useState(data[0]);
  const { theme, setTheme } = useTheme();

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
      <div style={{ color: cellTextBottom }} className="text-[0.6rem]">
        {name}
      </div>
    </div>
  );

  return (
    <div className="h-screen p-4  flex flex-col gap-4 items-center justify-center  w-screen">
      <div className="mb-4">
        <button
          onClick={() => setTheme('blue')}
          className="mx-2 px-2 py-1 rounded bg-blue-200"
        >
          Blue
        </button>
        <button
          onClick={() => setTheme('green')}
          className="mx-2 px-2 py-1 rounded bg-green-200"
        >
          Green
        </button>
        <button
          onClick={() => setTheme('gold')}
          className="mx-2 px-2 py-1 rounded bg-yellow-200"
        >
          Gold
        </button>
      </div>
      <div>
        <h1 className="text-3xl w-screen h-80  font-bold text-center  -mb-20 ">
          <CardScene selectedElement={selectedElement} theme={theme} />
        </h1>
      </div>
      <div className="mt-16 my-4  p-4 gap-10  overflow-y-auto ">
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
        <div id="row-4" className={` flex w-full justify-between  gap-2 `}>
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
      </div>
    </div>
  );
};

export default PeriodicTableFull;
