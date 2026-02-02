import React from 'react'
import { wildCreatures, wildGroups } from '../data/wildData'

const PhotoGrid = () => {
  return (
    <div className='flex flex-col gap-12 md:gap-16 lg:gap-20 p-6 md:p-8 lg:p-10 max-w-7xl mx-auto'>
      {
        wildGroups.map(
          group => (
            <div key={group.id} className='flex flex-col gap-6 py-10 rounded-xl border px-10' style={{color: group.col}}>
              <div className='text-center space-y-2 '>
                <h1 className='text-3xl font-mono md:text-4xl lg:text-5xl absolute -translate-y-16 font-bold bg-black px-2'>
                  {group.name}
                </h1>
                <p className='text-base md:text-lg text-gray-300 font-medium'>{group.desc}</p>
              </div>
              <div className='flex flex-wrap justify-center gap-4 md:gap-6 lg:gap-8'>
                {
                  wildCreatures.filter(creature => creature.grp === group.id).map(creature => (
                    <div key={creature.id} className='flex flex-col w-40 rounded-2xl p-4 items-center justify-center cursor-pointer 
                    relative border-white opacity-45 hover:opacity-100 border-3 border-dashed bg-[#000c] transition duration-500' style={{ color: creature.col,}}>
                      <input type='file' accept='image/*' className='absolute inset-0 w-full h-full opacity-0 cursor-pointer rounded-xl' />
                      <div className='flex flex-col items-center justify-center pointer-events-none'>
                        <span className='text-5xl mb-3'>+</span>
                        <p className='text-xl text-center font-bold line-clamp-2'>
                          {creature.name}
                        </p>
                      </div>
                    </div>
                  ))
                }
              </div>
            </div>
          )
        )
      }
    </div >
  )
}

export default PhotoGrid