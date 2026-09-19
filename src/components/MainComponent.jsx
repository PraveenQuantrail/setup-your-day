import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";

const TODO_DATA = "todo-data";

function LoadingComponent() {
  return (
    <div className="w-full flex items-center justify-center h-[90vh] ">
      <div className="animate-spin ease-in">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          stroke-width="2"
          stroke-linecap="round"
          stroke-linejoin="round"
          class="icon icon-tabler icons-tabler-outline icon-tabler-inner-shadow-top-left"
        >
          <path stroke="none" d="M0 0h24v24H0z" fill="none" />
          <path d="M12 3a9 9 0 1 1 0 18a9 9 0 0 1 0 -18" />
          <path d="M6 12a6 6 0 0 1 6 -6" />
        </svg>
      </div>
    </div>
  );
}

function CurrentTodoContainer({ value, removeHandler, completedhandler }) {
  // const [isEdit,setIsEdit] = useState(false);
  const [val, setVal] = useState(value?.value);

  return (
    <motion.div className={"my-2 py-3 px-5 border border-gray-200 rounded-md flex items-center justify-between " + `${value?.isCompleted && 'bg-gray-400 opacity-25'}`}>
      <div className={`font-bold text-sm ${value?.isCompleted && 'line-through'}`}>{value?.value}</div>

      <div className="flex items-center gap-3">
        <motion.button
          title="delete"
          style={{ scale: 0.98 }}
          whileTap={{ scale: 1 }}
          onClick={() => removeHandler(value?.id)}
          className="bg-green-700 cursor-pointer text-white h-10 gap-2 flex items-center py-2 px-2 text-md font-bold rounded-xl"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
            class="icon icon-tabler icons-tabler-outline icon-tabler-trash-x"
          >
            <path stroke="none" d="M0 0h24v24H0z" fill="none" />
            <path d="M4 7h16" />
            <path d="M5 7l1 12a2 2 0 0 0 2 2h8a2 2 0 0 0 2 -2l1 -12" />
            <path d="M9 7v-3a1 1 0 0 1 1 -1h4a1 1 0 0 1 1 1v3" />
            <path d="M10 12l4 4m0 -4l-4 4" />
          </svg>
        </motion.button>
        <motion.button
          title="Completed"
          disabled={value?.isCompleted}
          style={{ scale: 0.98 }}
          whileTap={{ scale: 1 }}
          onClick={() => completedhandler(value?.id)}
          className="bg-blue-700 cursor-pointer text-white h-10 gap-2 flex items-center py-2 px-2 text-md font-bold rounded-xl"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="currentColor"
            class="icon icon-tabler icons-tabler-filled icon-tabler-check"
          >
            <path stroke="none" d="M0 0h24v24H0z" fill="none" />
            <path d="M20.707 6.293a1 1 0 0 1 0 1.414l-10 10a1 1 0 0 1 -1.414 0l-5 -5a1 1 0 0 1 1.414 -1.414l4.293 4.293l9.293 -9.293a1 1 0 0 1 1.414 0" />
          </svg>
        </motion.button>
      </div>
    </motion.div>
  );
}

function MainComponent() {
  const [currentValue, setCurrentValue] = useState(null);
  const [AllData, setAllData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  console.log(AllData);
  useEffect(() => {
    function initSetup() {
      if (!localStorage?.getItem(TODO_DATA)) {
        localStorage?.setItem(TODO_DATA, JSON.stringify([]));
        setAllData([]);
        setTimeout(() => {
          setIsLoading(false);
        }, 2000);
        return;
      }
      setAllData(JSON.parse(localStorage?.getItem(TODO_DATA)));
      setTimeout(() => {
        setIsLoading(false);
      }, 2000);
      return;
    }

    initSetup();
  }, []);

  function insertTodoData() {
    if (currentValue) {
      const insertValue = {
        id: Date.now(),
        value: currentValue,
        isCompleted: false,
      };
      const finalValue = [...AllData, insertValue];
      setAllData(finalValue);
      localStorage.setItem(TODO_DATA, JSON.stringify(finalValue));
      setCurrentValue(null);
    }
  }

  function completedhandler(_id) {
    const completedData = AllData?.map((v) => {
      if (v?.id === _id) {
        return { ...v, isCompleted: true };
      }
      return v;
    });

    setAllData(completedData);
    localStorage?.setItem(TODO_DATA, JSON.stringify(completedData));
  }

  function removeHandler(_id) {
    const removedData = AllData?.filter((_v) => _v?.id !== _id);
    setAllData(removedData);
    localStorage?.setItem(TODO_DATA, JSON.stringify(removedData));
  }

  if (isLoading) return <LoadingComponent />;

  return (
    <div className="w-full h-[90vh] mt-10">
      <div className="flex items-center justify-center gap-2">
        <input
          value={currentValue ?? ""}
          onChange={(e) => setCurrentValue(e?.target?.value)}
          className="border-gray-800 border w-[50%] pl-5 h-10 rounded-xl text-sm "
          placeholder="Add you task here."
        />
        <motion.button
          style={{ scale: 0.98 }}
          whileTap={{ scale: 1 }}
          onClick={() => insertTodoData()}
          className="bg-red-700 cursor-pointer text-white h-10 gap-2 flex items-center py-2 px-2 text-md font-bold rounded-xl"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="19"
            height="19"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
            class="icon icon-tabler icons-tabler-outline icon-tabler-plus"
          >
            <path stroke="none" d="M0 0h24v24H0z" fill="none" />
            <path d="M12 5l0 14" />
            <path d="M5 12l14 0" />
          </svg>
          Add
        </motion.button>
      </div>

      <motion.div initial={{}} animate={{}} className="w-[55%] mx-auto my-10">
        {AllData?.map((_v, key) => {
          return (
            <div key={key}>
              <CurrentTodoContainer
                value={_v}
                completedhandler={completedhandler}
                removeHandler={removeHandler}
              />
            </div>
          );
        })}

        {AllData?.length === 0 && <h5 className="text-center text-gray-500">No Todo</h5>}
      </motion.div>
    </div>
  );
}

export default MainComponent;
