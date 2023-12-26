<script>
    import cn from '@/cn';
    import { Close, Cog } from '@/components/icons';
    import { getContext } from 'svelte';
    import { objectMap, modifierDecorator as m } from '@/helpers';
    import Stats from './Stats.svelte';

    const data = {
        type: 'character',
        name: 'Basil',
        race: {
            id: 201,
            name: 'Eladrin Elf',
        },
        stats: {
            str: 10,
            dex: 12,
            con: 16,
            int: 12,
            wis: 20,
            cha: 10,
        },
        saves: {
            str: false,
            dex: false,
            con: false,
            int: false,
            wis: false,
            cha: false,
        },
        classes: [
            { id: 101, name: 'cleric', level: 4, }, // prettier-ignore
            { id: 102, name: 'sorcerer', level: 5, }, // prettier-ignore
        ],
        skills: {
            acrobatics: { stat: 'dex', prof: 0 },
            'animal handling': { stat: 'wis', prof: 0 },
            arcana: { stat: 'int', prof: 0 },
            athletics: { stat: 'str', prof: 0 },
            deception: { stat: 'cha', prof: 0 },
            history: { stat: 'int', prof: 0 },
            insight: { stat: 'wis', prof: 0 },
            intimidation: { stat: 'cha', prof: 0 },
            investigation: { stat: 'int', prof: 0 },
            medicine: { stat: 'wis', prof: 0 },
            nature: { stat: 'int', prof: 0 },
            perception: { stat: 'wis', prof: 0 },
            performance: { stat: 'cha', prof: 0 },
            persuasion: { stat: 'cha', prof: 0 },
            religion: { stat: 'int', prof: 0 },
            'sleight of hand': { stat: 'dex', prof: 0 },
            stealth: { stat: 'dex', prof: 0 },
            survival: { stat: 'wis', prof: 0 },
        },
    };
    $: totalLevels = data.classes.reduce((sum, { level }) => sum + level, 0);
    $: proficiencyBonus = Math.ceil(totalLevels / 4) + 1;
    const skillMultiplier = [0, 1, 2, 0.5];
    let sections = ['core', 'gear', 'spells'];
    $: modifiers = objectMap(data.stats, (v) => Math.floor(v / 2) - 5);

    function getSkillBonus(skill) {
        return (
            modifiers[skill.stat] +
            skillMultiplier[skill.prof % skillMultiplier.length] *
                proficiencyBonus
        );
    }

    const { removeCard } = getContext('pages');
</script>

<div
    class={cn(
        'box-border flex w-160 flex-col rounded border border-black bg-base-600'
    )}>
    <div class="flex-0 flex justify-between p-1">
        <div class="flex gap-2">
            <img
                src="https://placehold.co/42"
                alt={data.name}
                class="rounded-md" />
            <div>
                <h2 class="mb-1 h-5 text-lg shadow-base-bg text-shadow">
                    {data.name}
                </h2>
                <small class="block capitalize shadow-black text-shadow">
                    {data.race.name} level {totalLevels}
                </small>
            </div>
        </div>
        <div class="flex gap-1">
            <button on:click={() => console.log('cog')} class="h-4">
                <Cog class="h-4 w-4 cursor-pointer" />
            </button>
            <button on:click={() => undefined} class="h-4">
                <Close class="h-4 w-4 cursor-pointer" />
            </button>
        </div>
    </div>
    <nav class="flex-0 flex">
        {#each sections as section, idx}
            <button
                class={cn(
                    'flex-0 rounded-t-lg bg-base-800 px-2 py-1 capitalize shadow-black text-shadow',
                    idx !== 0 && 'bg-base-700'
                )}>{section}</button>
        {/each}
    </nav>
    <div
        class="flex h-full flex-1 flex-col gap-2 rounded-b bg-base-800 p-2 text-sm">
        <Stats
            {data}
            {modifiers}
            bonus={proficiencyBonus}
            on:click={(stat) => {
                data.saves[stat] = !data.saves[stat];
            }} />
        <div class="flex">
            <div class="w-1/3 pr-1">
                <h3 class="w-full rounded bg-base-700 px-1 text-left">
                    Skills
                </h3>
                <table class="w-full">
                    <tbody>
                        {#each Object.entries(data.skills) as [name, skill]}
                            <tr>
                                <td class="w-5">{m(getSkillBonus(skill))}</td>
                                <td class="flex-1 capitalize">{name}</td>
                                <td class="flex flex-col justify-center">
                                    <button
                                        class="flex"
                                        on:click={() => {
                                            if (skill.prof >= 3)
                                                return (skill.prof = 0);
                                            skill.prof += 1;
                                        }}>
                                        <div
                                            class={cn(
                                                'h-4 w-4 rounded-full bg-base-700',
                                                [
                                                    '',
                                                    'bg-base-400',
                                                    'border-2 border-white bg-base-400',
                                                    'border-2 border-black bg-base-700',
                                                ][skill.prof]
                                            )} />
                                    </button>
                                </td>
                            </tr>
                        {/each}
                    </tbody>
                </table>
                <hr />
                <table>
                    <tbody>
                        <tr>
                            <td class="w-5">{m(proficiencyBonus)}</td>
                            <td class="flex-1">Proficiency Bonus</td>
                        </tr>
                        <tr>
                            <td class="w-5"
                                >{10 + getSkillBonus(data.skills.insight)}</td>
                            <td class="flex-1">Passive Insight</td>
                        </tr>
                        <tr>
                            <td class="w-5"
                                >{10 +
                                    getSkillBonus(
                                        data.skills.investigation
                                    )}</td>
                            <td class="flex-1">Passive Investigation</td>
                        </tr>
                        <tr>
                            <td class="w-5"
                                >{10 +
                                    getSkillBonus(data.skills.perception)}</td>
                            <td class="flex-1">Passive Perception</td>
                        </tr>
                    </tbody>
                </table>
            </div>
            <div class="w-2/3 pl-1"></div>
        </div>
    </div>
</div>

<style>
    tr {
        @apply flex gap-2;
    }
</style>
