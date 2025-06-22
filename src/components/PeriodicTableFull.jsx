import React, { useState } from 'react';
import { data } from '../utils/data.full';
import CardScene from './CardScene';
import OrbitScene from './OrbitScene';
import { colorsBlue } from '../utils/colorConstants';

const PeriodicTableFull = () => {
  const [selectedElement, setSelectedElement] = useState(data[0]);
  const cellBG = colorsBlue.textTertiary;
  const cellTextTop = colorsBlue.secondary;
  const cellTextBottom = colorsBlue.accent;

  const renderCell = (element, name, className = '') => (
    <div
      key={element}
      style={{ backgroundColor: cellBG }}
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
      <div>
        <h1 className="text-3xl w-screen h-80  font-bold text-center  -mb-20 ">
          <CardScene selectedElement={selectedElement} />
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
              {renderCell(data[rowIndex].element, data[rowIndex].name)}
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
