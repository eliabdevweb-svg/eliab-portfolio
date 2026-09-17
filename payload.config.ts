import { postgresAdapter } from "@payloadcms/db-postgres";
import { buildConfig } from "payload";

export default buildConfig({
  secret:process.env.PAYLOAD_SECRET||"development-secret-replace-before-production",
  serverURL:process.env.NEXT_PUBLIC_SITE_URL,
  admin:{user:"users"},
  db:postgresAdapter({pool:{connectionString:process.env.DATABASE_URL||"postgresql://postgres:postgres@127.0.0.1:54322/postgres"}}),
  collections:[
    {slug:"users",auth:true,admin:{useAsTitle:"email"},fields:[{name:"name",type:"text"}]},
    {slug:"projects",admin:{useAsTitle:"title"},fields:[{name:"title",type:"text",required:true},{name:"slug",type:"text",required:true,unique:true},{name:"summary",type:"textarea",required:true},{name:"cover",type:"upload",relationTo:"media"},{name:"featured",type:"checkbox",defaultValue:false},{name:"publishedAt",type:"date"}]},
    {slug:"expertises",admin:{useAsTitle:"title"},fields:[{name:"title",type:"text",required:true},{name:"description",type:"textarea",required:true},{name:"order",type:"number",defaultValue:0}]},
    {slug:"products",admin:{useAsTitle:"name"},fields:[{name:"name",type:"text",required:true},{name:"description",type:"textarea",required:true},{name:"url",type:"text"},{name:"status",type:"select",options:["active","coming-soon","archived"],defaultValue:"active"}]},
    {slug:"media",upload:{staticDir:"media"},fields:[{name:"alt",type:"text",required:true}]},
  ],
  globals:[{slug:"site-settings",fields:[{name:"heroTitle",type:"text",defaultValue:"Créer de l’impact."},{name:"heroText",type:"textarea"},{name:"location",type:"text",defaultValue:"Lomé, Togo"},{name:"availableRemotely",type:"checkbox",defaultValue:true}]}],
});
