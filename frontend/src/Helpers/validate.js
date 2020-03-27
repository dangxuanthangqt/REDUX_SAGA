const validate = values => {
    const errors = {}
    if (!values.title) {
      errors.title = 'Required Title'
    } else if (values.title.length > 15) {
      errors.title = 'Must be 15 characters or less'
    }
    if (!values.description) {
      errors.description = 'Required Descripton'
    } else if (values.description.length > 120) {
      errors.description = 'Must be 120 characters or less'
    }
    if(!values.status){
        errors.status ="Required Status"
    }
   
    return errors
  }
  export default validate;