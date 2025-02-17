<script>
  import { goto } from "$app/navigation";

  const APPS = [
    {
      name: "NACIN Admin",
      icon: "NA",
      description: "Admin portal and database",
      link: "https://admin.nacin.in",
      color: "#AB4ABA",
    },
    {
      name: "Paper Viewer",
      icon: "PV",
      description: "View and download papers",
      link: "/paper-viewer",
      color: "#0090FF",
    },
  ];

  function openLink(link) {
    if (link.startsWith("http")) {
      window.open(link, "_blank");
    } else {
      goto(link);
    }
  }
</script>

<h2 class="text-gray-500 text-xs font-medium uppercase tracking-wide">Apps</h2>
<section
  role="list"
  class="mt-3 grid grid-cols-1 gap-5 sm:gap-6 sm:grid-cols-2 lg:grid-cols-4"
>
  {#each APPS as app}
    <button
      class="col-span-1 flex shadow-sm rounded-md cursor-pointer text-left transition-all hover:shadow-md"
      onclick={() => openLink(app.link)}
    >
      <div
        class="flex-shrink-0 flex items-center justify-center w-16 text-white text-sm font-medium rounded-l-md"
        style={`background-color: ${app.color};`}
      >
        {app.icon}
      </div>
      <div
        class="flex-1 flex items-center justify-between border-t border-r border-b border-gray-200 bg-white rounded-r-md truncate"
      >
        <div class="flex-1 px-4 py-2 text-sm truncate">
          <span class="text-gray-900 font-medium hover:text-gray-600">
            {app.name}
          </span>
          <p class="text-gray-500">{app.description}</p>
        </div>
      </div>
    </button>
  {/each}
</section>
