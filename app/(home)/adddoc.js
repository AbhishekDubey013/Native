// import React, { useState, useEffect } from 'react';
// import {
//   StyleSheet,
//   Text,
//   View,
//   ScrollView,
//   TextInput,
//   Pressable,
//   Alert,
//   Image,
//   TouchableOpacity,
// } from 'react-native';
// import axios from 'axios';
// import * as ImagePicker from 'expo-image-picker';

// const Adddoc = () => {
//   const [name, setName] = useState('');
//   const [employeeId, setEmployeeId] = useState('');
//   const [image, setImage] = useState(null);
//   const [imageURIs, setImageURIs] = useState([]);

//   // useEffect(() => {
//   //   const fetchImages = async () => {
//   //     try {
//   //       const response = await axios.get('http://192.168.0.193:8000/image');
//   //       setImage(response.data);
//   //     } catch (error) {
//   //       console.error('Error fetching images', error);
//   //     }
//   //   };
  
//   //   fetchImages();
//   // }, []);


//   useEffect(() => {
//         const fetchImages = async () => {
//           try {
//             const response = await axios.get(`http://192.168.0.193:8000/image`);
//             setImageURIs((prevImages) => [...prevImages, ...response.data]);
//             setTotalPages(response.totalPages); // Set the total pages based on your server response structure.
//           } catch (error) {
//             console.error('Error fetching images', error);
//           }
//         };
//         fetchImages();
//           }, []);

//   const pickImage = async () => {
//     let result = await ImagePicker.launchImageLibraryAsync({
//       mediaTypes: ImagePicker.MediaTypeOptions.Images,
//       allowsEditing: true,
//       aspect: [4, 3],
//       quality: 1,
//     });

//     if (!result.cancelled) {
//       setImage(result.uri);
//     }
//   };

//   const handleRegister = () => {
//     let formData = new FormData();

//     if (image) {
//       formData.append('image', {
//         uri: image,
//         type: 'image/jpeg',
//         name: 'employeeImage.jpg',
//       });
//     }

//     formData.append('employeeDetails', JSON.stringify({ employeeName: name, employeeId: employeeId }));

//     axios.post('http://192.168.0.193:8000/adddoc', formData, {
//       headers: {
//         'Content-Type': 'multipart/form-data',
//       },
//     })
//     .then((response) => {
//       Alert.alert('Registration Successful', 'You have been registered successfully');
//       setName('');
//       setEmployeeId('');
//       setImage(null);
//     })
//     .catch((error) => {
//       Alert.alert('Registration Failed', 'An error occurred during registration');
//       console.log('Registration failed', error);
//     });
//   };

//   return (
//     <ScrollView style={{ flex: 1, backgroundColor: 'white' }}>
//       <View style={{ padding: 10 }}>
//         <TextInput
//           value={name}
//           onChangeText={setName}
//           style={styles.input}
//           placeholder="Full Name"
//           placeholderTextColor={'black'}
//         />

//         <TextInput
//           value={employeeId}
//           onChangeText={setEmployeeId}
//           style={styles.input}
//           placeholder="Employee ID"
//           placeholderTextColor={'black'}
//         />

//         {image && (
//           <Image
//             source={{ uri: image }}
//             style={styles.image}
//           />
//         )}

//         <TouchableOpacity onPress={pickImage} style={styles.button}>
//           <Text style={styles.buttonText}>Pick an Image</Text>
//         </TouchableOpacity>

//         <Pressable onPress={handleRegister} style={styles.button}>
//           <Text style={styles.buttonText}>Add Employee</Text>
//         </Pressable>
//       </View>
//     </ScrollView>
//   );
// };

// export default Adddoc;

// const styles = StyleSheet.create({
//   input: {
//     padding: 10,
//     borderColor: '#D0D0D0',
//     borderWidth: 1,
//     marginTop: 10,
//     borderRadius: 5,
//   },
//   button: {
//     backgroundColor: '#ABCABA',
//     padding: 10,
//     marginTop: 20,
//     justifyContent: 'center',
//     alignItems: 'center',
//     borderRadius: 5,
//   },
//   buttonText: {
//     fontWeight: 'bold',
//     color: 'white',
//   },
//   image: {
//     width: 200,
//     height: 200,
//     marginTop: 10,
//     alignSelf: 'center',
//   },
// });


import React, { useState, useEffect } from 'react';
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  TextInput,
  Pressable,
  Alert,
  Image,
  TouchableOpacity,
} from 'react-native';
import axios from 'axios';
import * as ImagePicker from 'expo-image-picker';
import base64 from 'base64-js';
const Adddoc = () => {
  const [name, setName] = useState('');
  const [employeeId, setEmployeeId] = useState('');
  const [imageURIs, setImageURIs] = useState([]);
  const [imageURI1s, setImageURI1s] = useState([]);
  useEffect(() => {
    const fetchImages = async () => {
      try {
        const response = await axios.get(`http://192.168.0.193:8000/image`);
        const imageData = response.data[0].image.data; // Access the image data array
        const base64Image = base64.fromByteArray(imageData);
        console.log(base64Image)
        const imageUri = `data:image/jpeg;base64,${base64Image}`;
        setImageURI1s((prevImages) => [...prevImages, imageUri]);
      } catch (error) {
        console.error('Error fetching images', error);
      }
    };
    fetchImages();
  }, []);

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });
console.log(result)
    if (!result.cancelled) {
      setImageURIs((prevImages) => [...prevImages, result.assets[0].uri]);
    }
  };

  const handleRegister = () => {
    let formData = new FormData();

    if (imageURIs.length > 0) {
      imageURIs.forEach((uri, index) => {
        formData.append('image', {
          uri: uri,
          type: 'image/jpeg',
          name: `employeeImage_${index}.jpg`,
        });
      });
    }

    formData.append(
      'employeeDetails',
      JSON.stringify({ employeeName: name, employeeId: employeeId })
    );

    axios
      .post('http://192.168.0.193:8000/adddoc', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      })
      .then((response) => {
        Alert.alert('Registration Successful', 'You have been registered successfully');
        setName('');
        setEmployeeId('');
        setImageURIs([]);
      })
      .catch((error) => {
        Alert.alert('Registration Failed', 'An error occurred during registration');
        console.log('Registration failed', error);
      });
  };

  

  return (
      <View style={{ padding: 10 }}>
        <TextInput
          value={name}
          onChangeText={setName}
          style={styles.input}
          placeholder="Full Name"
          placeholderTextColor={'black'}
        />

        <TextInput
          value={employeeId}
          onChangeText={setEmployeeId}
          style={styles.input}
          placeholder="Employee ID"
          placeholderTextColor={'black'}
        />

        {imageURI1s.map((uri, index) => (
          <Image
            key={index}
            source={{ uri: uri }}
            style={{ width: 100, height: 100 }}
          />
        ))}
        <TouchableOpacity onPress={pickImage} style={styles.button}>
          <Text style={styles.buttonText}>Pick an Image</Text>
        </TouchableOpacity>

        <Pressable onPress={handleRegister} style={styles.button}>
          <Text style={styles.buttonText}>Add Employee</Text>
        </Pressable>
      </View>
  );
};

export default Adddoc;

const styles = StyleSheet.create({
  input: {
    padding: 10,
    borderColor: '#D0D0D0',
    borderWidth: 1,
    marginTop: 10,
    borderRadius: 5,
  },
  button: {
    backgroundColor: '#ABCABA',
    padding: 10,
    marginTop: 20,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 5,
  },
  buttonText: {
    fontWeight: 'bold',
    color: 'white',
  },
  image: {
    width: 200,
    height: 200,
    marginTop: 10,
    alignSelf: 'center',
  },
});
