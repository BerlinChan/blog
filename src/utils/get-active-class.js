const getActiveClass = (name, contact) => {


  switch (name) {
    case 'twitter':
      return `https://www.twitter.com/${contact}`
    case 'github':
      return `https://github.com/${contact}`
    case 'telegram':
      return `https://t.me/${contact}`
    case 'email':
      return `mailto:${contact}`
    default:
      return contact
  }
}

export default getActiveClass
