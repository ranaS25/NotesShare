import React from 'react'

const Note = ({noteDetails}) => {

  const {tags, title, body } = noteDetails;
  return (
    <div
      className="flex-col h-fit w-fit bg-slate-300 p-4 rounded hover:bg-slate-400 select-none flex-grow-[0.3] basis-[fit-content] dark:bg-slate-600 dark:text-slate-100"
    >
      <h2 className="font-semibold text-lg my-1">{title}</h2>
      <p>{body}</p>
    </div>
  );
}


export const withTags = (Note) => {
  // console.log("check here : ", Note)
  return (props) => {
    const {tags} = props.noteDetails;
    return (
      <div className='relative '>
        <label className="absolute right-1 top-1 py-1 px-1 rounded bg-slate-700 text-slate-400">{tags[0].name}</label>
        <Note {...props} />
      </div>
    );
  }
}


export default Note;