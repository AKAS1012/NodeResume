module.exports = ({name, price, price2,reciptID})=>{
    const today = new today(
        `<!DOCTYPE html>
    <html>
    <head>
    <title>Page Title</title>
    </head>
    <body>
    <div className={style.body}> 
    <div className={style.container}  >
        <div className={style.leftSide}>
          
               
            <div className={style.profiletext}>
                <div className={{style.imgbox}} >
                <img className={style.img}  src="#"  />
                    
                </div>
                <h2 className={style.titlheading}>${`${name}`}<br></br><span className={style.span}>${`${name}`}</span></h2>
            </div>
            )
        } )
        }  
       
            <div className='contactinfo' >
                <ContactInfo/>
                 <h3 className={style.title}  >Contact Info</h3>
               
               <ul className={style.order} key={index}>
                <li className={style.leftlist} >
                    <span className={style.icon} ><i className='fa fa-phone' aria-hidden="true"></i></span>
                    <span className={style.text}>Mobno</span>
                </li>
                <li className={style.leftlist} >
                    <span className={style.icon}><i className='fa fa-envelope' aria-hidden="true"></i></span>
                    <span className={style.text}>{contact.useremail}</span>
                </li>
                <li className={style.leftlist}>
                    <span className={style.icon} ><i className='fa fa-linkedin' aria-hidden="true"></i></span>
                    <span className={style.text} >{contact.Linkedin}</span>
                </li>
                <li className={style.leftlist}>
                    <span className={style.icon}><i className='fa fa-map-marker' aria-hidden="true"></i></span>
                    <span className={style.text}>{contact.Addresss}</span>
                </li>
               </ul>
             
            </div>
          
            
            <div className='contacteduction' >
                
                <h3 className={style.title}  >Eduction</h3> 
                
               
                
               <ul className='order' >
                <li style={{position:"relative", listStyle:"none"}}>
                <h5 style={{fontWeight:"500",color:"Red"}}>{eduction.yyear}</h5>
                    <h4 style={{fontWeight:"500",color:"White"}}>{eduction.Class}</h4>
                    <h4 style={{fontWeight:"500",color:"White"}}>{eduction.University}</h4>
                </li> 
                </ul> 
            </div>
    
            <div className='contactLanguage' >
                <h3 className='title' style={{color:"white", textTransform:"uppercase",fontWeight:"600",letterSpacing:"1px", marginBottom:"20px"}} >Language</h3>
              
               
               <ul className='order' style={{position:"relative"}} key={index}>
                <li style={{position:"relative", listStyle:"none"}}>
                    <span className='text' style={{color:"white",fontWeight:"300"}}>{img.UserLanguage}</span>
                    <span className='perctage' style={{position:"relative", width:"100%", height:"6px",background:"black",display:'block',marginTop:"5px"}}><div style={{position:"absolute",top:"0", left:"0", height:"100%", background:"white", width:"90%"}}></div></span>
                </li>
               </ul>
             
            
             
            </div> 
        </div>
    
    
        <div className='right-side'  style={{postion:"relative", background:"white", padding:"40px"}}>
            <div className='about' style={{marginButtom:"50px"}}>
                <h4 style={{color:"blue",textTransform:"uppercase",letterSpacing:"1px", marginBottom:"10px"}}>Profile</h4>
                <p style={{letterSpacing:"1px", marginBottom:"10px"}}></p>
            </div>
            <div className='about' style={{marginButtom:"50px"}}>
                <h4 style={{color:"blue",textTransform:"uppercase",letterSpacing:"1px", marginBottom:"10px"}}>Exprience</h4>
               
               <div  style={{display:"flex", flexDirection:"row", margin:"20px 0"}} >
                <div style={{maxWidth:"150px"}}>
                    <h5 style={{textTransform:"uppercase",fontWeight:"600"}} >{Cmp.periodYear}</h5>
                    <h5  style={{textTransform:"uppercase",fontWeight:"400"}}>{Cmp.CompanyName}</h5>
                </div>
                <div>
                    <h4 style={{textTransform:"uppercase",fontSize:"16px", color:"blue"}}>{Cmp.profileDesig}</h4>
                    <p style={{letterSpacing:"1px", marginBottom:"10px"}}>{Cmp.projectDetsils} </p>
                </div>
               </div>
                 
               </Card.Body>
                        </Card>  
                        <Exprence/>
            </div>
            <br></br>
            <div className='about' style={{marginButtom:"50px"}}>
                 <h4 style={{color:"blue",textTransform:"uppercase",letterSpacing:"1px", marginBottom:"10px"}}>Profesnial Skill</h4> 
                  <ProfessinalSkill/>
            </div> 
            <br></br>
          <div className='about' style={{marginButtom:"40px"}}> 
               <div style={{diplay:"inline"}}>
                <h4 style={{color:"blue",textTransform:"uppercase",letterSpacing:"1px", marginBottom:"10px"}}>Interset</h4>
                 <span><button >Add</button></span> 
                 <span><button >Edit</button></span> 
                </div> 
                
                </div> 
    
        </div>        </div>
     </div>   
    </body>
    </html>`
    )
}