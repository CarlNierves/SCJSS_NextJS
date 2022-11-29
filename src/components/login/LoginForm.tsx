import React, { useEffect } from "react";
import { signIn, useSession } from "next-auth/react";
import { useRouter } from "next/router";
import { useForm } from "react-hook-form";


export default function LoginForm() {
    const { data : session } = useSession();
    const router = useRouter();
    const { redirect }: any = router.query;

    useEffect(() => {
        if(session?.user) {
            router.push(redirect || '/');
        }
    }, [router, session, redirect]);

    const { handleSubmit, register, formState: {errors}, }: any = useForm();
    const handleAuth: any = async ({ email, password}: any) => { 
        const query = `query Users { contextItem: item( path: "/sitecore/content/SCNextJs/Content/Users/Item1" language: "en" ) {
              id
              displayName
              fields {
                name
                value
              }
            }
          }`;
    
        const auth = await fetch('https://www.scnextjs.localhost/sitecore/api/graph/edge?sc_apikey=d6d6f819-7ab3-4ffc-959f-5fad0be5e4f5', {
            headers: {
                'Content-Type': 'application/json',
            },
            method: 'POST',
            body: JSON.stringify({query}),
        }).then(response => {
            return response.json();
        }).then( data => {
            let res = 'failed';
            let _id = '';
            let username = '';
            let _email = '';
            if(data && data.data.contextItem.fields.find((field: any) => field.value === email) && data.data.contextItem.fields.find((field: any) => field.value === password)){
                 _id = data.data.contextItem.id;
                 username = data.data.contextItem.displayName;
                const fe = data.data.contextItem.fields.find((field: any) => field.value === email);
                _email = fe.value;
                res = 'success';
                return { _id, username, _email, res}
            } 
            return  { _id, username, _email, res};
        });

        try {
            const a = auth.res;
            const b = auth.username;
            const c = auth._email;
            const d = auth._id;
            const result: any = await signIn('credentials', {
                redirect: false,
                a,
                b,
                c,
                d,
            });
            if(result.error) {
                alert(result.error);
            }
        } catch(err){
            alert(err);
        }
    }
    
    const regex = {"emailregex": /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+.[a-zA-Z0-9-.]+$/i};

    return (
        <div className="container-fluid bg-light">
            <div className="container p-5 bg-light">
                <div className="container-fluid row py-5">
                    <div className="col-5">
                        <h1>Login</h1> 
                        <form noValidate onSubmit={handleSubmit(handleAuth)}>
                            <div className="mb-3">
                                <label htmlFor="email" className="form-label">Email Address</label>
                                <input type="email" className="form-control" id="email" autoFocus 
                                    {...register(
                                        "email",
                                        { required: "Invalid email",
                                            pattern: {
                                                value: regex.emailregex,
                                                message: "Please enter a valid email address",
                                            },
                                        }
                                    )}
                                />
                                {errors.email && (<div style={{width: "100%", marginTop: ".25rem", fontSize: ".875em", color: "#dc3545"}}>Please enter a valid email address</div>)}
                            </div>
                            <div className="mb-3">
                                <label htmlFor="password" className="form-label">Password</label>
                                <input type="password" className="form-control" id="password" autoFocus 
                                {...register(
                                    "password",
                                    {
                                        required: "Please enter a password",
                                        minLength: {
                                            value: 1,
                                            message: "Please enter a password",
                                        },
                                    }
                                )}
                                />
                                {errors.password && (<div style={{ width: "100%", marginTop: ".25rem", fontSize: ".875em", color: "#dc3545"}}>Please enter a password</div>)}
                            </div>
                            <div className="mb-3">
                                <button className="btn btn-primary" type="submit">Login</button>
                            </div>
                        </form> 
                    </div>
                    <div className="col-7">
                        <div className="row">
                            <div className="col"></div>
                            <div className="col">
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
};