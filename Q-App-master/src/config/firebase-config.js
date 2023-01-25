import { initializeApp } from "firebase/app";
import {
  getAuth,
  signInWithPopup,
  FacebookAuthProvider,
  onAuthStateChanged,
} from "firebase/auth";
import {
  getFirestore,
  doc,
  setDoc,
  getDocs,
  addDoc,
  getDoc,
  collection,
  updateDoc,
  onSnapshot,
} from "firebase/firestore";
import { getStorage, uploadBytes, ref, getDownloadURL } from "firebase/storage";
import swal from "sweetalert";
const firebaseConfig = {
  apiKey: "AIzaSyB_MYspaDUKDr4PngRSta5YiYClHJeoc5E",
  authDomain: "qapp-aa3a5.firebaseapp.com",
  projectId: "qapp-aa3a5",
  storageBucket: "qapp-aa3a5.appspot.com",
  messagingSenderId: "507965006894",
  appId: "1:507965006894:web:c259c559a827055f036bbf",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const authentication = getAuth(app);
const database = getFirestore(app);
const storage = getStorage(app);

// function call from Login Component
const facebookSignIn = async () => {
  const provider = new FacebookAuthProvider();
  const result = await signInWithPopup(authentication, provider);

  //adding user data in firestore at the time of fbLogin
  await addUserToDB(result.user);
};

const addUserToDB = async (userInfo) => {
  const { uid, displayName, email } = userInfo;
  try {
    await setDoc(doc(database, "users", uid), {
      uid,
      displayName,
      email,
      tokenInfo: [],
    });

    console.log("userInfo store in Firestore by: " + displayName);
  } catch (e) {
    console.log("error in DataStore: " + e.message);
  }
};
// upload img
async function uploadImage(adImg) {
  const storageRef = ref(storage, `images/${adImg.name}`);
  const snapshot = await uploadBytes(storageRef, adImg);
  const url = await getDownloadURL(snapshot.ref);
  return url;
}

// for add new company to db
function addCompanyToDb(cName, since, openTime, closeTime, imgUrl) {
  const userId = authentication.currentUser.uid;
  return addDoc(collection(database, "companies"), {
    cName,
    since,
    openTime,
    closeTime,
    imgUrl,
    userId,
  });
}

// get company data from db
async function getCompaniesFromDb() {
  const querySnapshot = await getDocs(collection(database, "companies"));
  const companies = [];
  const userID = authentication.currentUser.uid;
  console.log("M.ahmed" + userID);

  querySnapshot.forEach((doc) => {
    const x = { ...doc.data() };

    if (x.userId == userID) {
      companies.push({ id: doc.id, ...doc.data() });
    }
  });
  return companies;
}

// get perticular company data (for CompToken)
async function getComFromDb(id) {
  const docRef = doc(database, "companies", id);
  const docSnap = await getDoc(docRef);

  if (docSnap.exists()) {
    console.log("Document data:", docSnap.data());
    return docSnap.data();
  } else {
    // doc.data() will be undefined in this case
    console.log("No such document!");
  }
}
// update the perticular fields(token informations) in company collection (func call from Manage Tokens)
async function addTokenToCompany(comData, tTime, tLimit, cId, date) {
  const { cName, closeTime, openTime, imgUrl, userId, since } = comData;

  const washingtonRef = doc(database, "companies", cId);

  return await updateDoc(washingtonRef, {
    tokenLimit: tLimit,
    tokenTime: tTime,
    tokenDate: date,
    soldTo: [],
    tokenSold: 0,
    currentToken: 0,
  });
}

// for User , get all companies data
async function getAllCompaniesFromDb() {
  const querySnapshot = await getDocs(collection(database, "companies"));
  const companies = [];

  querySnapshot.forEach((doc) => {
    companies.push({ id: doc.id, ...doc.data() });
  });
  return companies;
}


// update sold token (call from components/Companies)
async function updateSoldTokenInDB(compId, tokenBuy) {
  const washingtonRef = doc(database, "companies", compId);
  try {

    await updateDoc(washingtonRef, {

      tokenSold: tokenBuy
    });

    // alert('successfull')
    swal("Registered!", "Your Token is Registered!", "success");
  } catch (error) {
    alert('error--> ' + error)
  }
}

// update current token (call from ComTokens)
async function updateCurrentTokenInDb(cId, currentTokenUpd) {
  const washingtonRef = doc(database, "companies", cId);
  try {

    await updateDoc(washingtonRef, {

      currentToken: currentTokenUpd
    });

    // alert('next --> ' + currentTokenUpd)


  } catch (error) {
    alert('error--> ' + error)
  }
}

export {
  facebookSignIn,
  authentication,
  uploadImage,
  addCompanyToDb,
  getCompaniesFromDb,
  getComFromDb,
  addTokenToCompany,
  getAllCompaniesFromDb,
  updateSoldTokenInDB,
  updateCurrentTokenInDb,
};
