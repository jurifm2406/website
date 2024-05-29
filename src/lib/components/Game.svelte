<script>
    import Phaser from "phaser";
    import { onMount } from "svelte";

    let game;

onMount(() => {
    const config = {
        type: Phaser.AUTO,
        width: 800,
        height: 600,
        scene: {
            preload: preload,
            create: create,
            update: update,
        },
    };

    game = new Phaser.Game(config);

    function preload() {
        // Preload assets here
    }

    function create() {
        // Create game objects here
    }

    function update() {
        // Update game objects here
    }
});
</script>

<div id="game-container">

</div>