class Utils {
    static mergeTasks(tasks, streamData) {
      // generate an array of ids of streamData
      const streamDataIds = streamData.map(task => task._id);
  
      return tasks
        // consider streamData as the source of truth
        // first take existing tasks which are not present in stream data
        .filter(({ _id }) => !streamDataIds.includes(_id))
        // then add tasks from stream data
        .concat(streamData)
        // remove tasks which are deleted in stream data
        .filter(task => !task._deleted)
        // finally sort on the basis of creation timestamp
        .sort((a, b) => a.time_created - b.time_created);
    }
  }
  
  export default Utils;
  