import { Helmet } from 'react-helmet-async'
import AddPlantForm from '../../../components/Form/AddPlantForm'
import uploadImage from '../../../api/utilis';
import useAuth from '../../../hooks/useAuth';
import { useState } from 'react';
import useAxiosSecure from '../../../hooks/useAxiosSecure';
import toast from 'react-hot-toast';

const AddPlant = () => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();
  const [uploadText, setUploadText] = useState({name: 'Upload Plant Image', size: 0, progress: 0});
  const [loading, setLoading] = useState(false);
  // form submit 
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true)
    const form = e.target;
    const name = form.name.value;
    const description = form.description.value;
    const category = form.category.value;
    const price = parseFloat(form.price.value);
    const quantity = parseInt(form.quantity.value);
    const image = form.image.files[0];

    const photoURL = await uploadImage(image);

    // seller info from user
    const seller = {
      name: user?.displayName,
      image: user?.photoURL,
      email: user?.email,
    };
    // create plant data object
    const plantData = {
      name,
      description,
      category,
      price,
      quantity,
      image: photoURL,
      seller,
    }
    console.table(plantData)
    // save plant data to db
    try {
      // save plant to db using api post req
      const { data } = await axiosSecure.post('/plants', plantData);
      if(data){
        toast.success('Plant added successfully');
        form.reset();
      }

    } catch (error) {
      console.log(error)
    }finally{
      setLoading(false)
    }
  }

  return (
    <div>
      <Helmet>
        <title>Add Plant | Dashboard</title>
      </Helmet>

      {/* Form */}
      <AddPlantForm handleSubmit={handleSubmit}
      loading={loading}
       uploadText={uploadText} setUploadText={setUploadText} />
    </div>
  )
}

export default AddPlant;
