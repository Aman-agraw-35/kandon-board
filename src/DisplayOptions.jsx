const DisplayOptions = ({ setGroupBy, setOrderBy }) => {
    return (
      <div className="display-options">
        <label>Group By:</label>
        <select onChange={(e) => setGroupBy(e.target.value)}>
          <option value="status">Status</option>
          <option value="user">User</option>
          <option value="priority">Priority</option>
        </select>
        
        <label>Order By:</label>
        <select onChange={(e) => setOrderBy(e.target.value)}>
          <option value="priority">Priority</option>
          <option value="title">Title</option>
        </select>
      </div>
    );
  };
  
  export default DisplayOptions;