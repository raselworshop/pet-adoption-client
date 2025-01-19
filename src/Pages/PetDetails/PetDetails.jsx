import { useParams } from 'react-router-dom';
import { Drawer, DrawerClose, DrawerContent, DrawerDescription, DrawerFooter, DrawerHeader, DrawerTitle, DrawerTrigger } from '../../components/components/ui/drawer';
import { Field, Form, Formik } from 'formik';
import { useEffect, useState } from 'react';
import useAuth from '../../Hooks/useAuth';
import useAxiosPrivate from '../../Hooks/useAxiosPrivate';
import { Button } from '../../components/components/ui/button';
import { Separator } from '@/components/components/ui/separator';
import PhoneInput from 'react-phone-input-2';
import 'react-phone-input-2/lib/style.css';
import toast from 'react-hot-toast';
import { Helmet } from 'react-helmet';
import useAdoptedPet from '../../Hooks/useAdoptedPet';


const PetDetails = () => {
    const { user } = useAuth()
    const { id } = useParams();
    const [pet, setPet] = useState(null)
    const privateAxios = useAxiosPrivate()
    const { refetch } = useAdoptedPet()

    useEffect(() => {
        const fetchPet = async () => {
            try {
                const response = await privateAxios.get(`/pets/${id}`)
                console.log(response.data)
                setPet(response.data)
            } catch (error) {
                console.error('Error fetching pet details:', error);
            }
        }
        fetchPet()
    }, [id, privateAxios])

    const handleSubmit = async (values) => {
        const adoptionData = {
            petId: pet._id,
            petName: pet.petName,
            petImage: pet.petImage,
            adopterName: user?.displayName,
            adopterMail: user?.email,
            adopterPhone: values.phone,
            adopterAddress: values.address
        }
        console.table(adoptionData)
        try {
            if (!user) {
                toast.error('Please Login to adopt')
            } else {
                const response = await privateAxios.post('/adopted', adoptionData)
                console.log(response.data)
                if (response.data.insertedId) {
                    toast.success(`Congratulations! Successfully adopted`)
                    refetch()
                }
            }
        } catch (error) {
            console.log("Taking adoption error", error)
            toast.error(error.message)
        }
    }

    const handleLogin = () => {
        toast.error("You are not logged in, please login");
    }

    if (!pet) {
        return <div>Loading pet details...</div>;
    }

    return (
        <div className="container mx-auto p-4">
            <Helmet><title>PA || PET DETAILS</title></Helmet>
            <div className="border rounded p-4 text-center">
                <div className='w-full flex flex-col md:flex-row items-center justify-center gap-3'>
                    <div className='flex-1  md:border-r-2 md:pr-4'>
                        <img src={pet.petImage} alt={pet.petName}
                            className="w-full object-cover rounded mb-4" />
                    </div>
                    <div className='flex-1 text-left'>
                        <h2 className="text-xl font-bold">{pet.petName}</h2>
                        <p>Age: {pet.petAge}</p>
                        <p>Location: {pet.petLocation}</p>
                        <p>Added Date: {pet.dateAdded}</p>
                        <p>Pet Age: {pet.petAge}</p>
                        {/* <p>About Pet: {longDescription}</p> */}
                        <div dangerouslySetInnerHTML={{ __html: pet.longDescription }}></div>
                    </div>
                </div>
                <Separator className="mb-4" />

                {user ? (
                    <Drawer size="md" >
                        <DrawerTrigger>
                            <Button>Adopt Now</Button>
                        </DrawerTrigger>
                        <DrawerContent>
                            <DrawerHeader>
                                <DrawerTitle>
                                    <h2 className="text-xl font-bold mb-4">{pet.petName}</h2>
                                </DrawerTitle>
                                <DrawerDescription>
                                    <Formik
                                        initialValues={{ phone: '', address: '' }}
                                        onSubmit={handleSubmit} >
                                        {({ setFieldValue }) => (
                                            <Form>
                                                <div className="mb-4">
                                                    <label className="block text-start">User Name</label>
                                                    <Field name="userName" value={user?.displayName}
                                                        disabled className="border rounded p-2 w-full dark:bg-gray-700 dark:text-gray-300" />
                                                </div>
                                                <div className="mb-4">
                                                    <label className="block text-start">Email</label>
                                                    <Field name="userEmail" value={user?.email} disabled
                                                        className="border rounded p-2 w-full dark:bg-gray-700 dark:text-gray-300" />
                                                </div>
                                                <div className="mb-4">
                                                    <label className="block text-start">Phone Number</label>
                                                    <PhoneInput
                                                        country={'bd'}
                                                        value={''}
                                                        containerClass="w-full dark:bg-gray-700 dark:text-gray-300"
                                                        onChange={(phone) => setFieldValue('phone', phone)}
                                                        inputClass="border rounded p-2 w-full dark:bg-gray-700 dark:text-gray-300"
                                                    />
                                                </div>
                                                <div className="mb-4">
                                                    <label className="block text-start ">Address</label>
                                                    <Field name="address" className="border rounded p-2 w-full dark:bg-gray-700 dark:text-gray-300" required />
                                                </div>
                                                <div className="flex justify-end">
                                                    <Button className="w-full dark:bg-gray-700 dark:text-gray-300" type="submit">Adopt {pet.petName}</Button>
                                                </div>
                                            </Form>
                                        )}
                                    </Formik>
                                </DrawerDescription>
                            </DrawerHeader>
                            <DrawerFooter>
                                <DrawerClose>
                                    <Button variant="outline">Cancel</Button>
                                </DrawerClose>
                            </DrawerFooter>
                        </DrawerContent>
                    </Drawer>
                ) : (
                    <div onClick={handleLogin} className='' >
                        <Button>Adopt Now</Button>
                    </div>
                )}

            </div>
        </div>
    );
};

export default PetDetails;