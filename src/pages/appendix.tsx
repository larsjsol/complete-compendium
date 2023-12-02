import React from 'react'

import MonsterLink from '../components/MonsterLink';
import Layout from '../components/Layout';
import styled from 'styled-components';
import { HeadProps } from 'gatsby';
import CSS from 'csstype';

const keys_titles_json: Map<string, string> = require('../data/AA_KEYS_TITLES.json')

type MonsterLinksProps = {
    monster_keys: Map<string, string>,
}

const MonsterLinksWrapper = styled.div`
    align-items: center;
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    justify-content: space-between;
    margin-top: 1rem;
`

const MonsterLinksWrapperStyle: CSS.Properties = {
    alignItems: "center",
    display: "flex",
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
    marginTop: "1rem",
}

type DataProps = {
    site: {
        siteMetadata: {
            title: string
        }
    }
}

//for each monster_key in the KEYS_TITLES, display a link to the monster page
const MonsterLinks = (props: MonsterLinksProps) => {

    // let arr = Array.from(props.monster_keys.keys())
    // console.log(arr)
    // console.log("monster keys:", props.monster_keys)
    const monster_map = props.monster_keys
    const monster_keys = Array.from(Object.keys(props.monster_keys)).sort((a, b) => a.localeCompare(b))

    const monster_links = monster_keys.map(monster_key => {
        // console.log()
        return (
            <MonsterLink key={monster_key} monster_key={monster_key} monster_title={monster_map[monster_key] ? props.monster_keys[monster_key]! : ""} />
        )
    }
    )
    return (
            // <div style={MonsterLinksWrapperStyle}>
            <div className='MonsterLinksWrapper'>
                {monster_links}
            </div>
    )
}

const flip = (data: { [s: string]: unknown; } | ArrayLike<unknown>) => Object.fromEntries(
    Object
        .entries(data)
        .map(([key, value]) => [value, key])
);

export function appendix() {
    return (
        <>
            <Layout url='/appendix'>
                <div className='background-appendix'>
                    <div className="AppendixDescription">Browse monster source books by setting or browse all at once.</div>
                    <MonsterLinks monster_keys={keys_titles_json} />
                </div>
            </Layout>
        </>
    );
}
export default appendix;

export function Head(props: HeadProps<DataProps>) {
    return (
        <>
            <title>Appendix - AD&D 2e Complete Compendium</title>
        </>
    )
}