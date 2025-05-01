import React, { useState, useEffect } from 'react';
import { useParams, useNavigate }    from 'react-router-dom';
import { Container }    from 'reactstrap';
import { ResultCard, DateTime, AdvancedCard, Spinner, ErrorHandler } from 'asab_webui_components';
import axios from 'axios';
import { useTranslation } from 'react-i18next';
import { sleep } from '../utils';

export function UserDetails() {
  const { id }    = useParams();
  const [ userData, setUserData ] = useState(null);
  const [ loading, setLoading ] = useState(true);
  const [ error, setError ] = useState(null);
  const { t } = useTranslation();
  const navigate = useNavigate();

  useEffect(() => {
    let isNeeded = true;

    (async () => {
        try {
            // await sleep(2000);  // uncomment to see the loading screen
            const resp = await axios.get(`https://devtest.teskalabs.com/detail/${id}`);  // change to see error screen
            if (isNeeded) {
                setUserData(resp.data);
            }
        }
        catch (e) {
            if (isNeeded) {
                setError({
                    error: 'General|Failed to load user details',
                    error_dict: { msg: e.message }
                });
            }
        }
        finally {
            if (isNeeded) {
                setLoading(false);
            }
        }
    })();
    return () => { isNeeded = false; };
  }, [id, t]);

  if (loading) return (
    <Container className='h-100'>
        <Spinner />
    </Container>
  );

  if (error) return (
    <Container className='h-100'>
        <ResultCard
            body={
            <>
                <div className='p-2'>
                    <ErrorHandler error={error} />
                </div>
                <button className="btn btn-primary me-1" onClick={() => navigate("/")}>Home <i className="bi bi-house"></i></button>
            </>}
            isSuccessful={userData}
        />
    </Container>
  );

  const renderUser = (
    <div className='p-3'>
        <dl className="row">
            <dt className="col-sm-3">ID</dt>                               <dd className="col-sm-9">{userData.id}</dd>
            <dt className="col-sm-3">{t("General|Username")}</dt>          <dd className="col-sm-9">{userData.username}</dd>
            <dt className="col-sm-3">{t("General|Email")}</dt>             <dd className="col-sm-9">{userData.email}</dd>
            <dt className="col-sm-3">{t("General|Created at")}</dt>        <dd className="col-sm-9"><DateTime value={userData.created * 1000}/></dd>
            <dt className="col-sm-3">{t("General|Last sign in")}</dt>      <dd className="col-sm-9"><DateTime value={userData.last_sign_in * 1000}/></dd>
            <dt className="col-sm-3">{t("General|Address")}</dt>           <dd className="col-sm-9">{userData.address}</dd>
            <dt className="col-sm-3">{t("General|Phone")}</dt>             <dd className="col-sm-9">{userData.phone_number}</dd>
            <dt className="col-sm-3">{t("General|IP address")}</dt>        <dd className="col-sm-9">{userData.ip_address}</dd>
            <dt className="col-sm-3">{t("General|MAC address")}</dt>       <dd className="col-sm-9">{userData.mac_address}</dd>
        </dl>
        <button className="btn btn-primary me-1" onClick={() => navigate("/")}>Home <i className="bi bi-house"></i></button>
    </div>
  );

  return (
    <Container className="h-100">
      <ResultCard
        body={renderUser}
      />
      {/* ctrl + shift + 1 to see the json */}
      <AdvancedCard data={userData} />
    </Container>
  );
}