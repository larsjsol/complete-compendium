import React from "react"
import Layout from '../components/Layout';
import {  PageProps, Link, HeadFC  } from "gatsby";

import { CreatePagesArgs } from 'gatsby';
import { Interweave } from "interweave";

// Formatting
import "@styles/SettingColors.css"
// import "../styles/MonsterPage.css"
import COLORS from '@styles/SettingColors'
import RandomMonsterButton from "@components/RandomMonsterButton";

import * as monsterPageStyles from "@styles/modules/monsterpage.module.css"

// export default function Container({ children }) {
//   return <div className={containerStyles.container}>{children}</div>
// }

const cat_acronyms = require('@data/CatAcronyms.json')
const sorted_tsr = require('@data/sortedtsr.json')
///////////
// Styles

const settingImageStyle = {
  float: "right",
  width: "150px",
}

const headingStyles = {
  marginTop: 0,
  marginBottom: 64,
  maxWidth: 320,
}

type MonsterDataType = {
    TSR: string[],
    fullBody: string,
    images: string[],
    setting: string,
    statblock: Object,
    title: string
}

type MonsterPageContext = {
    monster_key: string
    monster_data: MonsterDataType
    sources: string[]
    statblock_names: string[]
    title: string
    prev_key: string
    next_key: string
}


type MonsterDataWrapper = {
    monster_page: MonsterPageContext
    // workaround syntax warning fix,
    // the following aren't used in reality, only
    // monster_page
    monster_key: string
    monster_data: MonsterDataType
    sources: string[]
    statblock_names: string[]
    title: string
    prev_key: string
    next_key: string
}

interface Props {
  pageContext: MonsterDataWrapper
  }

const MonsterTemplate: React.FC<Props> = ({pageContext} ) => {
  const monster_page_data: MonsterPageContext = pageContext
  // console.log(monster_page_data)
  // const monster_object = pageContext.monster_object
//   console.log("monster page")
//   console.log(monster_page_data)
  // console.log("monster template")
  // console.log(monster_object)
  const monster_key = monster_page_data.monster_key
  const title = monster_page_data.title
  const sources = monster_page_data.sources
  const previous_monster_key = monster_page_data.prev_key
  const next_monster_key = monster_page_data.next_key
//   console.log(previous_monster_key, next_monster_key)
  // Checking Main Image
  //  If the regex pattern matches, know we NEED an image. So set the url to where it should be with monster_key
  //  and also have an onerror="javascript:this.src='images/default.jpg'" to set the image to default if it doesn't exist
  //  If doesn't need image, set the bool flag and no image will be rendered
  let monster_image = null;
  let needs_image = true;
  let image_url = "";
  // if(monster_page_data.monster_data.images[1]) regex contains monster_key
  if(monster_page_data.monster_data.images[1] && monster_page_data.monster_data.images[1].match(new RegExp(monster_page_data.monster_key, "g"))){
      // console.log("Should have image")
      needs_image = true;
  } else {
      // console.log("Does not have image")
      needs_image = false;
  }

  if(needs_image){
      // Set image url
      image_url = "/images/monsters/img/" + monster_page_data.monster_key + ".gif"
      let image_placeholder = "https://upload.wikimedia.org/wikipedia/commons/6/65/No-Image-Placeholder.svg"

      monster_image = <img className={monsterPageStyles.monsterImage}   src={image_url}
      alt={monster_page_data.monster_data.title} 
      title={monster_page_data.monster_data.title} 
      onError={({currentTarget}) => {
          currentTarget.onerror = null;
          currentTarget.alt = "This monster is missing it's image. It will be found eventually.";
          currentTarget.src = image_placeholder;
          currentTarget.title = "Missing image of " + monster_page_data.monster_data.title;
      }}/>

  } 
    
  // Change document title to monster title
  if(typeof document !== 'undefined'){
      document.title = monster_page_data.monster_data.title + " - Complete Compendium";
  }

  // Handle setting and accent color.
  const setting_name = monster_page_data.monster_data.setting;
  const setting_acr = cat_acronyms[setting_name]
  var hrClass = "hr2"
  var titleStyle = {}
  if(setting_acr){
      hrClass = "hr2-" + setting_acr
      const colorVar = "--color-" + setting_acr
      titleStyle = {color: COLORS.get(setting_acr)}
  }

  // Title style

  const fullBody = monster_page_data.monster_data.fullBody;

  if(monster_key == "horax"){
    console.log("appendix template monster, HORAX")
    console.log(pageContext)
    console.log("prev", previous_monster_key)
    console.log("next", next_monster_key)
  }

  // const { book_data } = data
  return (
    <Layout>
      <div>
        <div>
          <div className={monsterPageStyles.monsterNavLinks}>
            <div className={monsterPageStyles.monsterNav}>
                <Link className={monsterPageStyles.monsterNavLink} to={"../" + previous_monster_key}>Previous</Link>
            </div>
            {/* Random Monster */}
            <div className={monsterPageStyles.monsterNav}>
                <RandomMonsterButton />
            </div>
            <div className={monsterPageStyles.monsterNav}>
                <Link className={monsterPageStyles.monsterNavLink} to={"../" + next_monster_key}>Next</Link>
            </div>
          </div>
        </div>

      {/* TITLE */}
      <div className={monsterPageStyles.topHeader}>
          <h1 style={titleStyle}>{monster_page_data.monster_data.title}</h1>
          <Link to={"/catalog/" + cat_acronyms[monster_page_data.monster_data.setting]}>
              <img className={monsterPageStyles.settingImage} src={`/img_settings/${cat_acronyms[monster_page_data.monster_data.setting]}.gif`}  alt={monster_page_data.monster_data.setting + "Campaign Setting Logo"} title={monster_page_data.monster_data.setting}/>
          </Link>
      </div>
      
      <hr className ={hrClass}/>
      <hr className ={monsterPageStyles.hr1}/>

      <div className={monsterPageStyles.monsterImgFrame}>
      {monster_image}
      </div>

      <Interweave className="interweave" content={fullBody} />

      {/* TSR Array */}
      <div className={monsterPageStyles.sourceList}>
        <div className={monsterPageStyles.tsrLabel}>
            Sourcebooks:
        </div>
        <div className={monsterPageStyles.tsr}>
            {
                (monster_page_data.monster_data.hasOwnProperty("TSR") && monster_page_data.monster_data["TSR"] != null) ?
                    monster_page_data.monster_data["TSR"].map((tsr: string) => {
                        return (
                            <div key={tsr}>
                                <Link to={"/catalog/" + cat_acronyms[monster_page_data.monster_data.setting] + "/" + tsr}>{sorted_tsr[tsr]} ({tsr})</Link>
                                <br/>
                            </div>
                        )
                    }
                )
                : "No TSR"
            }
        </div>
    </div>

    {/* LAST MODIFIED */}
    {/* <div className="last-modified">
        Last Modified: {monster_page_data.updatedAt}
    </div> */}




      </div>
    </Layout>
  )
}

export default MonsterTemplate