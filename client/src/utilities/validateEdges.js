//Validate connections
const isConnectionValid = (connection, edges) => {
  const { source, target } = connection;

  //connect to self
  if (source === target) return false;

  //Table already has a target
  let hasTarget = false;
  if (edges.filter(edge => edge.source === source).length > 0)
    hasTarget = true;

  //Table already has a source
  let hasSource = false;
  if (edges.filter(edge => edge.target === target).length > 0)
    hasSource = true;

  //One way from A to Z
  let current = target;

  while (current) {
    let next = "";

    edges.forEach(edge => {
      if (edge.source === current) {
        next = edge.target;
      }
    });
    if (next === source)
      return false;
    current = next;
  }

  if (hasTarget || hasSource)
    return false;
  else
    return true;
};

export default isConnectionValid;