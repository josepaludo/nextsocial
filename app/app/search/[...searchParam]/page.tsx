import SearchForm from "@/components/client/forms/SearchForm";
import SearchHeader from "@/components/general/SearchHeader";
import Groups from "@/components/server/group/Groups";
import Posts from "@/components/server/post/Posts";
import Users from "@/components/server/profile/Users";
import { prisma } from "@/prisma/db";
import { getGroups, getPosts } from "@/serverfunctions";
import { SearchParam } from "@/types";


export default async function SearchWithParams(
    {params}: {params: {searchParam: [SearchParam, String]}}
) {
    const param = params.searchParam[0] 
    const query = params.searchParam[1]?.replaceAll("%20", " ") 
    let queryResult: JSX.Element|undefined = <></>
    if (param && query) {
        // queryResult = <>
        //     {query.split("%20").map(async (q, key) => (
        //         <div key={key}>
        //             {await getPostsUsersGroupsByQuery(param, q)}
        //         </div>
        //     ))}
        // </>
        queryResult = await getPostsUsersGroupsByQuery(param, query)
    }

    return <>
        <h1 className="text-4xl font-semibold mb-5">Filter your search:</h1>
        <SearchForm searchParam={params.searchParam[0]} />
        { queryResult === undefined ?
            <SearchHeader>
                No results for &quot;{query}&quot; on {getSearchParamName(param)}.
            </SearchHeader>
        :
            !query ?
            <SearchHeader>
                Your queries will be shown here.
            </SearchHeader>
        :
            <>
                <SearchHeader>
                    Results for &quot;{query}&quot; on {getSearchParamName(param)}.
                </SearchHeader>
                {queryResult}
            </>
        }
    </>
}

function getSearchParamName(param: SearchParam) {
    const [firstHalf, secondHalf] = param.split('-')
    return toTitleCase(firstHalf) + " " + toTitleCase(secondHalf)
}
function toTitleCase(string: string) {
    return string[0].toUpperCase() + string.slice(1)
}

async function getPostsUsersGroupsByQuery(
    param: SearchParam, query: String
) {
    const exp = new RegExp(`.*${query}.*`, "i")
    // const modifiedQuery = query.replace(/[\p{M}\p{P}]/gu, '')
    // const exp = new RegExp(`.*${modifiedQuery}.*`, 'iu');

    switch (param) {
        case SearchParam.userName:
            return await getMatchingUserNames(exp)
        // case SearchParam.userBio:
        //     break
        case SearchParam.postTitle:
            return await getMatchingPostTitles(exp)
        case SearchParam.postContent:
            return await getMatchingPostContents(exp)
        case SearchParam.groupName:
            return await getMatchingGroupNames(exp)
        case SearchParam.groupDescription:
            return await getMatchingGroupDescriptions(exp)
        default:
            return undefined
    }
}

async function getMatchingUserNames(exp: RegExp) {
    const users = await prisma.user.findMany()
    const filtered = users.filter(user => exp.test(user.name))
    if (!filtered || filtered.length === 0) return undefined
    return <Users selectedUsers={filtered} />
}

async function getMatchingPostTitles(exp: RegExp) {
    const posts = await getPosts()
    const filtered = posts.filter(post => exp.test(post.title))
    if (!filtered || filtered.length === 0) return undefined
    return <Posts selectedPosts={filtered} />
}

async function getMatchingPostContents(exp: RegExp) {
    const posts = await getPosts()
    const filtered = posts.filter(post => exp.test(post.content))
    if (!filtered || filtered.length === 0) return undefined
    return <Posts selectedPosts={filtered} />
}

async function getMatchingGroupNames(exp: RegExp) {
    const groups = await getGroups()
    const filtered = groups.filter(group => exp.test(group.name) )
    if (!filtered || filtered.length === 0) return undefined
    return <Groups selectedGroups={filtered} />
}

async function getMatchingGroupDescriptions(exp: RegExp) {
    const groups = await getGroups()
    const filtered = groups.filter(group => exp.test(group.description) )
    if (!filtered || filtered.length === 0) return undefined
    return <Groups selectedGroups={filtered} />
}
