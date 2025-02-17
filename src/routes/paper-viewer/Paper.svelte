<script>
  import { cleanHtml, formatTime, formatType } from "./functions";
  let { PAPER = $bindable() } = $props();

  // Check if choices should be displayed in compact mode (2 columns)
  function isCompact(choices) {
    return choices.every((choice) => choice.option.length < 50);
  }
</script>

<header class="flex justify-between gap-10 px-8 mb-12">
  <h2 class="text-xl capitalize m-0">
    Exam: {PAPER.name}
  </h2>
  <h4 class="m-0">Paper ID: {PAPER.batch.code}</h4>
  <div class="text-right">
    <h4 class="mt-[-0.5rem]">Time: {formatTime(PAPER.time_limit)}</h4>
  </div>
</header>

<!-- Sections -->
{#each PAPER.sections as section}
  {#if section.questions.length > 0}
    <section class="print:break-after-always mt-24 first:!mt-0">
      <h3 class="text-center text-2xl font-bold">
        {section.subject}
        ({formatType(section["type"])})
      </h3>
      <br />

      <!-- Questions -->
      {#each section.questions as question, i}
        <article class="flex gap-4 mb-4 print:break-inside-avoid">
          <div><b>{i + 1}.</b></div>
          <div class="flex-1">
            <div class="mb-4">{@html cleanHtml(question.body)}</div>
            <div
              class={`${isCompact(question.choices) ? "grid grid-cols-2" : "space-y-2"}`}
            >
              {#each question.choices as choice, i}
                <div class="flex gap-3 mr-4">
                  <b>({String.fromCharCode(65 + i)})</b>
                  <div>{@html cleanHtml(choice.option)}</div>
                </div>
              {/each}
            </div>
          </div>
        </article>
      {/each}
    </section>
  {/if}
{/each}

<!-- Watermark -->
<div class="fixed bottom-0 right-5 -z-10 opacity-30">
  <div class="text-6xl font-bold text-gray-300">
    {PAPER.batch.code}
  </div>
</div>

<style>
  @media print {
    @page {
      size: A4;
      margin: 2cm 1.5cm;
    }
  }
</style>
