const notFound = (req, res) => {
    console.log('Im in route does not exist route')
    res.status(404).send('Route does not exist')
}
export default notFound


// this middleware will give redirects user if he try to access non implemented routes