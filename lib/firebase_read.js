import {
  collection,
  doc,
  getDoc,
  getDocs,
  onSnapshot,
} from "firebase/firestore";
import { db } from "../firebase";
import useSWRSubscription from "swr/subscription";
import { useState } from "react";
import { mutate } from "swr/_internal";

export const UseSessionStream = (a) => {
  const [isLoading, setIsLoading] = useState(true);
  const { data, error } = useSWRSubscription(
    [`users/${a.user}/sessions`],
    ([path], { next }) => {
      const ref = collection(db, path);
      const unsubscribe = onSnapshot(
        ref,
        (snap) => {
          setIsLoading(false);
          next(
            null,
            snap.docs.map((snap) => snap.data())
          );
        },
        (error) => {
          next(error.message);
          console.log(error.message);
          setIsLoading(false);
        }
      );
      return () => unsubscribe();
    }
  );
  return { data, error, isLoading };
};

export const UseClassStream = (a) => {
  const [isLoading, setIsLoading] = useState(true);
  const { data, error } = useSWRSubscription(
    [`users/${a.user}/sessions/${a.session}/classes`],
    ([path], { next }) => {
      const ref = collection(db, path);
      const unsubscribe = onSnapshot(
        ref,
        (snap) => {
          setIsLoading(false);
          next(
            null,
            snap.docs.map((snap) => snap.data())
          );
        },
        (error) => {
          next(error.message);
          console.log(error.message);
          setIsLoading(false);
        }
      );
      return () => unsubscribe();
    }
  );
  return { data, error, isLoading };
};

export const UseBusStream = (a) => {
  const [isLoading, setIsLoading] = useState(true);
  const { data, error } = useSWRSubscription(
    [`users/${a.user}/sessions/${a.session}/buses`],
    ([path], { next }) => {
      const ref = collection(db, path);
      const unsubscribe = onSnapshot(
        ref,
        (snap) => {
          setIsLoading(false);
          next(
            null,
            snap.docs.map((snap) => snap.data())
          );
        },
        (error) => {
          next(error.message);
          console.log(error.message);
          setIsLoading(false);
        }
      );
      return () => unsubscribe();
    }
  );
  return { data, error, isLoading };
};

export const UseStopsStream = (a) => {
  const [isLoading, setIsLoading] = useState(true);
  const { data, error } = useSWRSubscription(
    [`users/${a.user}/sessions/${a.session}/stops`],
    ([path], { next }) => {
      const ref = collection(db, path);
      const unsubscribe = onSnapshot(
        ref,
        (snap) => {
          setIsLoading(false);
          next(
            null,
            snap.docs.map((snap) => snap.data())
          );
        },
        (error) => {
          next(error.message);
          console.log(error.message);
          setIsLoading(false);
        }
      );
      return () => unsubscribe();
    }
  );
  return { data, error, isLoading };
};

export const UseHouseStream = (a) => {
  const [isLoading, setIsLoading] = useState(true);
  const { data, error } = useSWRSubscription(
    [`users/${a.user}/sessions/${a.session}/houses`],
    ([path], { next }) => {
      const ref = collection(db, path);
      const unsubscribe = onSnapshot(
        ref,
        (snap) => {
          setIsLoading(false);
          next(
            null,
            snap.docs.map((snap) => snap.data())
          );
        },
        (error) => {
          next(error.message);
          console.log(error.message);
          setIsLoading(false);
        }
      );
      return () => unsubscribe();
    }
  );
  return { data, error, isLoading };
};

export const UseStaffStream = (a, viewRole) => {
  const [isLoading, setIsLoading] = useState(true);
  const { data, error } = useSWRSubscription(
    [`users/${a.user}/sessions/${a.session}/roles/${viewRole}/staff`],
    ([path], { next }) => {
      const ref = collection(db, path);
      const unsubscribe = onSnapshot(
        ref,
        (snap) => {
          setIsLoading(false);
          next(
            null,
            snap.docs.map((snap) => snap.data())
          );
        },
        (error) => {
          next(error.message);
          console.log(error.message);
          setIsLoading(false);
        }
      );
      return () => unsubscribe();
    }
  );

  return { data, error, isLoading };
};

export const UseRoleStream = (a) => {
  const [isLoading, setIsLoading] = useState(true);
  const { data, error } = useSWRSubscription(
    [`users/${a.user}/sessions/${a.session}/roles`],
    ([path], { next }) => {
      const ref = collection(db, path);
      const unsubscribe = onSnapshot(
        ref,
        (snap) => {
          setIsLoading(false);
          next(
            null,
            snap.docs.map((snap) => snap.data())
          );
        },
        (error) => {
          next(error.message);
          console.log(error.message);
          setIsLoading(false);
        }
      );
      return () => unsubscribe();
    }
  );
  return { data, error, isLoading };
};

export const UsePListStream = (a,sr) => {
  const [isLoading, setIsLoading] = useState(true);
  const { data, error } = useSWRSubscription(
    [`users/${a.user}/sessions/${a.session}/studentsAccount/${sr}/records`],
    ([path], { next }) => {
      const ref = collection(db, path);
      const unsubscribe = onSnapshot(
        ref,
        (snap) => {
          setIsLoading(false);
          next(
            null,
            snap.docs.map((snap) => snap.data())
          );
        },
        (error) => {
          next(error.message);
          console.log(error.message);
          setIsLoading(false);
        }
      );
      return () => unsubscribe();
    }
  );
  return { data, error, isLoading };
};




 

